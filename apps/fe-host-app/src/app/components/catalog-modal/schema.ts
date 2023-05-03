import * as yup from 'yup';

export const schema = yup.object().shape({
    name: yup
        .string()
        .required()
        .matches(/^[a-zA-Z]+$/, 'The catalog name must consist only of letters'),
    vertical: yup.string().required(),
    isPrimary: yup.boolean(),
});
