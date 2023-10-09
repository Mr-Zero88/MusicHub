((nativError) => {
  global.Error = function Error(message: string, options: { cause: Error }) {
    let error = new nativError(message, options);
    error.stack = [error.stack?.split('\n')[0], ...(error.stack?.split('\n').slice(2) ?? [])].join('\n');
    if (options != null && options.cause != null && options.cause.stack != null)
      error.stack += `\n\n\t[cause]: ${options.cause.stack.split('\n')[0]}\n\t${options.cause.stack.split('\n').slice(1).join('\n\t')}`;
    return error;
  } as ErrorConstructor
})(global.Error);

export { };