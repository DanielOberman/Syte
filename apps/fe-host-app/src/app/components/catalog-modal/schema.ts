import * as yup from 'yup';

export const schema = yup.object().shape({
    name: yup.string().required(),
    vertical: yup.string().required(),
    isPrimary: yup.boolean(),
});
