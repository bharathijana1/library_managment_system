import * as yup from 'yup';



export const basicSchema = yup.object().shape({
  title: yup
    .string()
    .required('Title is required')
    .min(5,"Minimun 5 charcter required")
    .max(25,"Maximun 25 character required"),
  author: yup.object().shape({
    name: yup
      .string()
      .required('Author name is required')
      .min(3,"Minimun 3 charcter required")
      .max(25,"Maximun 25 character required"),
    birthYear: yup
      .number()
      .positive("Enter a possitive year")
      .integer("Year must be integer")
      .min(1600, 'Enter a valid birth year')
      .max(2024, 'Enter a valid birth year')
      .required('Author birth year is required'),
    nationality: yup
      .string()
      .required('Author nationality is required'),
    biography: yup
      .string()
      .min(30,"Minimun 30 char")
      .max(300,"maximum 300 char")
      .required('Author biography is required'),
  }),
  genre: yup
  .string()
  .required('Genre is required'),
  publicationYear:yup
    .number()
    .positive("Enter a possitive year")
    .integer("Year must be integer")
    .min(1000, 'Enter a valid Publication year')
    .max(2024, 'Enter a valid Publication year')
    .required('Book Publication year is required'),
    isbn: yup
    .string()
    .required("ISBN code is required")
    .min(13, "ISBN code Minimum 13 digits required")
    
});