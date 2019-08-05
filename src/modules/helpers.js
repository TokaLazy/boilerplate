export const compose = (...func) => Component => {
    if (!func.length) return Component;

    if (func.length === 1) return func[0](Component);

    return func.reduce((a, b) => a(b(Component)));
};
