import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contactsOps';
import { selectContacts } from '../../redux/contactsSlice';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './ContactForm.module.css';

const validationSchema = Yup.object({
  name: Yup.string()
    .matches(/^[a-zA-Zа-яА-ЯїЇєЄіІґҐ\s]+$/, 'Only letters allowed')
    .min(3, 'Too short!')
    .max(50, 'Too long!')
    .required('Required'),
  number: Yup.string()
    .matches(/^\d{3}-\d{2}-\d{2}$/, 'Format: XXX-XX-XX')
    .required('Required'),
});

function ContactForm() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handleSubmit = (values, { resetForm, setFieldError }) => {
    if (
      contacts.some(
        (contact) => contact.name.toLowerCase() === values.name.toLowerCase()
      )
    ) {
      setFieldError('name', `Contact "${values.name}" already exists!`);
      return;
    }

    if (contacts.some((contact) => contact.number === values.number)) {
      setFieldError('number', `Number "${values.number}" already exists!`);
      return;
    }

    dispatch(addContact({ name: values.name, number: values.number }));
    resetForm();
  };

  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors }) => (
        <Form className={styles.form}>
          <label htmlFor="name" className={styles.label}>
            Name
          </label>
          <Field
            type="text"
            name="name"
            id="name"
            className={styles.inputContact}
            autoComplete="off"
          />
          <ErrorMessage name="name" component="div" className={styles.error} />

          <label htmlFor="number" className={styles.label}>
            Number
          </label>
          <Field
            type="text"
            name="number"
            id="number"
            className={styles.inputContact}
            autoComplete="off"
          />
          <ErrorMessage
            name="number"
            component="div"
            className={styles.error}
          />

          {errors.name && <div className={styles.error}>{errors.name}</div>}
          {errors.number && <div className={styles.error}>{errors.number}</div>}

          <button type="submit" className={styles.button}>
            Add contact
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default ContactForm;
