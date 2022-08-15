export const requiredRule = (name) => {
  return {
    required: true,
    message: `Поле "${name}" обязательно для заполнения`,
    trigger: "blur",
  };
};
