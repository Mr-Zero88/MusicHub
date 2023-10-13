import * as TerraconnectUI from 'terraconnect-ui';
import { HTMLComponent } from 'terraconnect-ui';
import { throttle } from 'terraconnect-throttle';
import './CardGrid.css';
import { createState, Value, State, Modified, ChildModified } from 'terraconnect-state';
import Grid from '../Grid/Grid';
import GridItem from '../Grid/GridItem';

type CardGridProps = {
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

  type girdSize = (typeof girdSize)[typeof Value];
  let gridColummCount = createState((girdSize: girdSize, girdCardSize: number, girdGap: number) => Math.floor(girdSize.width / (girdCardSize + girdGap)), [girdSize, girdCardSize, girdGap]);
  let girdElementSize = createState((girdSize: girdSize, gridColummCount: number) => (girdSize.width - 10 * (gridColummCount - 1)) / gridColummCount, [girdSize, gridColummCount]);

  let rChildren = (children.reduce[Value]<Array<TerraconnectUI.HTMLComponent<unknown>>>((a, b, i) => {
    if (Array.isArray(b[Value]))
      a.push(...b[Value]);
    else
      a.push(b[Value]);
    console.log("rChildren");
    return a;
  }, []) as State<any>).filter[Value]((_: any) => _ != null) as typeof children;

  let positions: Array<Array<number>> = [];
  let calc = (rChildren: Array<HTMLComponent<unknown>>, gridColummCount: number) => {
    let offset = 0;
    positions = [];
    return rChildren.map((child, i) => {
      let card = child;
      if (card.localName != "app-card")
        card = Array.from<HTMLComponent<unknown>>(card.children as unknown as ArrayLike<HTMLComponent<unknown>>).find(_ => _.localName == "app-card") ?? card;
      let width = JSON.parse(card.getAttribute('width') ?? "1");
      let height = JSON.parse(card.getAttribute('height') ?? "1");
      let size: [number | [number, number], number | [number, number]] = [
        typeof width == "number" ? width : [width.min, width.max],
        typeof height == "number" ? height : [height.min, height.max]
      ];
      if (Array.isArray(size[0]))
        size[0] = Math.max(size[0][0], Math.min(size[0][1], gridColummCount));
      if (Array.isArray(size[1]))
        size[1] = size[1][1]
      if (positions.length == 0 || positions[positions.length - 1].length + size[0] - 1 >= gridColummCount)
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
        <GridItem area={`${y + 1}/${x + 1}/${y + size[1] + 1}/${x + size[0] + 1}`}>
          {child}
        </GridItem>
      );
    });
  }
  let callCalc = throttle(() => mappedChildren[Value] = calc(rChildren[Value], gridColummCount[Value]), 1);
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

  let gridRowsCount = createState((mappedChildren) => positions.length, [mappedChildren]);

  return (
    <Grid data-grid-columm-count={gridColummCount} data-grid-rows-count={gridRowsCount} data-grid-element-size={girdElementSize}>
      {mappedChildren}
    </Grid >
  );
}

export default CardGrid as TerraconnectUI.Component<CardGridProps>;