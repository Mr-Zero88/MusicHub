import { marked } from 'marked';
import { isState, Value } from 'terraconnect-state';
import { Component, ComponentFN } from 'terraconnect-ui/*';
import { jsx } from 'terraconnect-ui/jsx-runtime';

type MarkdownProps = {
  content?: string;
};

const Markdown: ComponentFN<MarkdownProps> = ({ content }) => {
  content = isState(content) ? content[Value] : content;
  let div = jsx("div", {}) as unknown as HTMLDivElement;
  if (content == null) return <></>;
  div.innerHTML = marked(content, { async: false });
  return <>{Array.from(div.children)}</>;
}

export default Markdown as Component<MarkdownProps>;