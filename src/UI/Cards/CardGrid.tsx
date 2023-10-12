import * as TerraconnectUI from 'terraconnect-ui';
import { throttle } from 'terraconnect-throttle';
import './CardGrid.css';
import { createState, Value, State, Modified, ChildModified } from 'terraconnect-state';

interface CardGridProps {
  margin?: number;
  gap?: number;
  cardSize?: number;
}

const CardGrid: TerraconnectUI.ComponentFN<CardGridProps> = function ({ children, margin, gap, cardSize }) {
  let gridMargin = createState(margin as (State<number> | number | null) ?? 0);
  let girdGap = createState(gap as (State<number> | number | null) ?? 0);
  let girdCardSize = createState<number>(cardSize as (State<number> | number | null) ?? 100);

  let girdSize = createState({ width: 0, height: 0 });
  new ResizeObserver(() => girdSize[Value] = { width: this.clientWidth - gridMargin[Value] * 2, height: this.clientHeight - gridMargin[Value] * 2 }).observe(this);

  let gridColummCount = createState(() => Math.floor(girdSize[Value].width / (girdCardSize[Value] + girdGap[Value])), [girdSize]);
  let girdElementSize = createState(() => (girdSize[Value].width - 10 * (gridColummCount[Value] - 1)) / gridColummCount[Value], [girdSize, gridColummCount]);

  let rChildren = (children.reduce[Value]((a, b, i) => {
    if (Array.isArray(b[Value]))
      a.push(...b[Value]);
    else
      a.push(b[Value]);
    console.log("rChildren");
    return a;
  }, []) as State<any>).filter[Value]((_: any) => _ != null) as typeof children;

  let positions: Array<Array<number>> = [];
  let calc = () => {
    let offset = 0;
    positions = [];
    return rChildren[Value].map((child, i) => {
      let card: Element = (child as Element);
      if (card.localName != "app-card")
        card = Array.from(card.children).find(_ => _.localName == "app-card") ?? card;
      let width = JSON.parse(card.getAttribute('width') ?? "1");
      let height = JSON.parse(card.getAttribute('height') ?? "1");
      let size: [number | [number, number], number | [number, number]] = [
        typeof width == "number" ? width : [width.min, width.max],
        typeof height == "number" ? height : [height.min, height.max]
      ];
      if (Array.isArray(size[0]))
        size[0] = Math.max(size[0][0], Math.min(size[0][1], gridColummCount[Value]));
      if (Array.isArray(size[1]))
        size[1] = size[1][1]
      if (positions.length == 0 || positions[positions.length - 1].length + size[0] - 1 >= gridColummCount[Value])
        positions.push([]);
      let x = positions[positions.length - 1].length;
      let y = positions.length - 1;
      for (let indexY = 0; indexY < size[1]; indexY++) {
        if (indexY != 0 && positions.length - 1 <= y + indexY)
          positions.push([]);
        for (let indexX = 0; indexX < size[0]; indexX++)
          positions[positions.length - 1].push(i);
      }
      offset += size[1];

      console.log("mappedChildren");
      return (
        <div style={{ gridArea: `${y + 1}/${x + 1}/${y + size[1] + 1}/${x + size[0] + 1}` }
        }> {child} </div>
      );
    });
  }
  let callCalc = throttle(() => mappedChildren[Value] = calc(), 1);
  const applyListeners = (child: Element) => {
    let card = child;
    if (card.localName != "app-card")
      card = Array.from(card.children).find(_ => _.localName == "app-card") ?? card;
    (card as unknown as { props: any }).props.width?.[Modified].on(callCalc);
    (card as unknown as { props: any }).props.height?.[Modified].on(callCalc);
  }
  rChildren[Value].forEach(applyListeners);
  rChildren[ChildModified].on((child, key) => {
    if (typeof key == "string" && !key.includes('.'))
      applyListeners(child);
  });

  let mappedChildren = createState(calc,
    [rChildren, gridColummCount]
  );

  let gridRowsCount = createState(() => positions.length, [mappedChildren]);

  return (
    <div data-grid-columm-count={gridColummCount} data-grid-rows-count={gridRowsCount} data-grid-element-size={girdElementSize}>
      {mappedChildren}
    </div >
  );
}

export default CardGrid as TerraconnectUI.Component<CardGridProps>;