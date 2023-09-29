import React from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-native';

import useCreateReview from '../../hooks/useCreateReview';
import CreateReviewForm from './CreateReviewForm';

const initialValues = {
  text: '',
  repositoryName: '',
  rating: 0,
  ownerName: ''
};

const validationSchema = yup.object().shape({
  ownerName: yup.string()
    .required('Repository owner name is required'),
  repositoryName: yup.string()
    .required('Repository name is required'),
  rating: yup.number()
    .required('Rating is required')
    .min(0, 'Rating must be at least 0')
    .max(100, 'Rating cannot exceed 100'),
  text: yup.string()
    .notRequired(),
});

export const CreateReviewContainer = ({ onSubmit }) => {
  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const CreateReview = () => {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;

    try {
      const { data } = await createReview({ ownerName, repositoryName, rating, text });
      navigate(`/repositories/${data.createReview.repositoryId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return <CreateReviewContainer onSubmit={onSubmit} />;
};

export default CreateReview;