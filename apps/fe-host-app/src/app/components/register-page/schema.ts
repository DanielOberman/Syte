import * as Yup from 'yup';

export const schema = Yup.object().shape({
    email: Yup.string()
        .email('Please enter a valid email')
        .required('Email is required')
        .test('email-template', 'Please enter an email in the format of example@example.com', (value) => {
            const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
            return regex.test(value);
        }),
    password: Yup.string().required('Password is required'),
});
