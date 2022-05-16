import { Formik } from 'formik';
import { useState, useEffect } from 'react';
import { InputText, Label, TextArea } from '../layout';
import * as Yup from 'yup';
import { motion } from 'framer-motion';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: Yup.string().required('Email is required').email('Email is invalid'),
  message: Yup.string()
    .required('Message is required')
    .min(10, 'Message must be at least 10 characters'),
});

export const ContactForm = () => {
  const [success, setSuccess] = useState(false);

  if (success)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        enter={{ opacity: 1 }}
        className="mt-10 text-center"
      >
        <h2 className="text-3xl text-orange-400 font-bold">
          Thank you for your message!
        </h2>
        <p className="text-xl">I will get back to you as soon as possible.</p>
      </motion.div>
    );

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{ name: '', email: '', message: '' }}
      onSubmit={async (values, { setSubmitting }) => {
        const result = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (result.ok) {
          setSuccess(true);
          setSubmitting(false);
        } else {
          console.log('Error: ', result.statusText);
          setSubmitting(false);
          setSuccess(false);
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-8 mt-8">
            <div>
              <Label htmlFor="name">Name</Label>
              <InputText
                name="name"
                id="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.name}
                touched={touched.name}
                className={
                  touched.name && errors.name ? 'border-red-500 border-2' : ''
                }
              />
              {touched.name && errors.name && (
                <div className="text-sm text-red-500 text-center p-2 bg-gray-100 mx-2">
                  {errors.name}
                </div>
              )}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <InputText
                name="email"
                id="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email}
                touched={touched.email}
                className={
                  touched.email && errors.email ? 'border-red-500 border-2' : ''
                }
              />
              {touched.email && errors.email && (
                <div className="text-sm text-red-500 text-center p-2 bg-gray-100 mx-2">
                  {errors.email}
                </div>
              )}
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <TextArea
                name="message"
                id="message"
                value={values.message}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.message}
                touched={touched.message}
                className={
                  touched.message && errors.message
                    ? 'border-red-500 border-2'
                    : ''
                }
              />
              {touched.message && errors.message && (
                <div className="text-sm text-red-500 text-center p-2 bg-gray-100 mx-2 -mt-2 mb-5">
                  {errors.message}
                </div>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="sendBtn relative w-full h-full block bg-orange-400 text-white font-bold py-2 mt-3"
            disabled={isSubmitting}
          >
            <span className="z-30">Send</span>
            <div className="filler absolute top-0 left-0 ease-in-out duration-500 bg-red-400 z-10 w-0 h-0" />
          </button>
        </form>
      )}
    </Formik>
  );
};

{
  /* <form className="flex flex-col space-y-8 mt-10">
  <div>
    <Label>Name</Label>
    <InputText
      name="name"
      placeholder="Your name..."
      onChange={onChange}
      onFocusLoss={onFocusLoss}
    />
  </div>
  <div>
    <Label>Email</Label>
    <InputText
      name="email"
      placeholder="Your email..."
      onChange={onChange}
      onFocusLoss={onFocusLoss}
    />
  </div>
  <div>
    <Label>Message</Label>
    <TextArea name="message" onChange={onChange} onFocusLoss={onFocusLoss} />
  </div>
  <button className="sendBtn relative w-full h-full block bg-orange-400 text-white font-bold py-2">
    <span className="z-30">Send</span>
    <div className="filler absolute top-0 left-0 ease-in-out duration-500 bg-red-400 z-10 w-0 h-0" />
  </button>
</form>; */
}
