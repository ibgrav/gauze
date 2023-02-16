interface Actions {
  click: string;
}

type Component<Props> = (props: Props, on: Actions) => string;

function createComponent<Props = {}>(name: string, component: Component<Props>) {
  const actions: Actions = { click: 'data-on="render"' };

  return (props: Props) => {
    return `<div data-name="${name}">
          <template>${JSON.stringify(props)}</template>
          ${component(props, actions)}
      </div>`;
  };
}

interface ButtonProps {
  count: number;
}

const Button = createComponent("button", ({ count }: ButtonProps, on) => {
  return `<button ${on.click}><span style="color: red">${count}</span></button>`;
});

export default Button;
