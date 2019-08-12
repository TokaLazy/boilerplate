export const compose = (...func): React.Component => (Component): React.Component => {
    if (!func.length) return Component;

    if (func.length === 1) return func[0](Component);

    return func.reduce((a, b): React.Component => a(b(Component)));
};
