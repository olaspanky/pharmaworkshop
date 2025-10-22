// import React, { useState, useEffect } from 'react';
// import SavingsSummary from './SavingsSummary';
// import { appAxios } from 'api/axios';
// import { useFormik } from 'formik';
// import InputField from 'components/shared/input-field';
// import SelectInput from 'components/shared/select-input';
// import Button from 'components/shared/button';
// import { OptionType } from '../../../../types';
// import Checkbox from 'components/shared/checkbox/index';
// import { getTokenDetails } from 'functions/userSession';
// import { decodeToken } from 'react-jwt';
// import { toast } from 'react-toastify';
// import { selectInterestRate } from 'store/slices/savings';
// import { useAppSelector, useAppDispatch } from 'store/hooks';
// import CardDisclaimerModal from 'components/shared/modal/CardDisclaimerModal';
// import { savingsSlice } from 'store/slices/savings';
// import Fundwalletform from 'components/user/modalform/fundwalletform';
// import { chargeAndVerifyCard } from 'services/PaystackService';
// import { v4 as uuidv4 } from 'uuid';
// import {
//   FinishSavingsTargetProps,
//   standardizeDateFormat,
//   finishSavingValidationSchema as validationSchema,
// } from './utils';
// import WalletBalanceModal from './WalletBalanceModal';

// // Add PaystackPop to the window object type
// declare global {
//   interface Window {
//     PaystackPop: any;
//   }
// }

// function FinishSavingsTarget({
//   handleBack,
//   handleNext,
//   handleDataSubmit,
//   formValues,
//   setFormValues,
// }: FinishSavingsTargetProps) {
//   const [sourceOptions, setSourceOptions] = useState<OptionType[]>([]);
//   const [isInterestTargetChecked, setIsInterestTargetChecked] = useState(
//     formValues?.interestTagentSaving || false
//   );
//   const savingsType = useAppSelector((state) => state.savings.savingsType);
//   const interestRate = useAppSelector(selectInterestRate);
//   const [showCardDisclaimer, setShowCardDisclaimer] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showWalletBalanceModal, setShowWalletBalanceModal] = useState(false);
//   const dispatch = useAppDispatch();
//   // Add idempotency key state
//   const [idempotencyKey, setIdempotencyKey] = useState(uuidv4());

//   // Add this standard format function at the top of the component

//   const formik = useFormik({
//     initialValues: {
//       ...formValues,
//       startDate:
//         formValues?.startDate ||
//         standardizeDateFormat(new Date().toISOString()),
//       endDate: standardizeDateFormat(formValues?.endDate),
//       savingsType: savingsType,
//       interestTagentSaving: formValues?.interestTagentSaving || false,
//       autoSave: false,
//       autoWithdrawal: false,
//     },
//     validationSchema,
//     onSubmit: (values) => {
//       // Format the dates to YYYY-MM-DD without time component
//       const formattedValues = {
//         ...values,
//         startDate: standardizeDateFormat(values.startDate),
//         endDate: standardizeDateFormat(values.endDate),
//         savingsTime: values.preferredTime,
//         savingsType: 'jompVault',
//       };

//       // IMPORTANT: When implementing the actual API call in the parent component,
//       // remember to include the idempotencyKey in the request headers:
//       // headers: { 'Idempotency-Key': formattedValues.idempotencyKey }

//       setFormValues(formattedValues);
//     },
//   });

//   // Add function to ensure start date is always set
//   const ensureStartDateExists = () => {
//     if (!formik.values.startDate) {
//       const today = new Date();
//       const formattedToday = standardizeDateFormat(today.toISOString());
//       formik.setFieldValue('startDate', formattedToday);
//       console.log(
//         'Setting default start date in initialization:',
//         formattedToday
//       );
//     }
//   };

//   // Call this function after formik initialization
//   useEffect(() => {
//     ensureStartDateExists();
//   }, []);

//   // Update the checkbox states if formik values change
//   useEffect(() => {
//     setIsInterestTargetChecked(!!formik.values.interestTagentSaving);
//   }, [formik.values.interestTagentSaving]);

//   useEffect(() => {
//     const getPaymentSource = async () => {
//       try {
//         const { data } = await appAxios.get(`/get-saving-source`);
//         if (data && data.statusCode === 200) {
//           const formattedOptions = data.data.map((source: any) => ({
//             label: source.name,
//             value: source.id,
//           }));
//           setSourceOptions(formattedOptions);
//         }
//       } catch (error) {}
//     };

//     getPaymentSource();
//   }, []);

//   // Function to save form values to localStorage

//   // Function to clear form values from localStorage
//   const clearFormFromLocalStorage = () => {
//     try {
//       localStorage.removeItem('jompSavingsFormValues');
//     } catch (error) {
//       console.error('Error clearing form from localStorage:', error);
//     }
//   };

//   useEffect(() => {
//     // If we're initializing with existing form values, don't recalculate the end date
//     // Just ensure the dates are in the correct format for the API
//     if (formValues?.startDate && formValues?.endDate) {
//       // Use the dates as they are, just ensure they're properly formatted for internal use
//       const startDateFormatted = formValues.startDate.includes('/')
//         ? standardizeDateFormat(formValues.startDate)
//         : formValues.startDate;

//       const endDateFormatted = formValues.endDate.includes('/')
//         ? standardizeDateFormat(formValues.endDate)
//         : formValues.endDate;

//       formik.setFieldValue('startDate', startDateFormatted);
//       formik.setFieldValue('endDate', endDateFormatted);

//       console.log('Using dates from previous form:', {
//         startDate: startDateFormatted,
//         endDate: endDateFormatted,
//       });
//     }
//   }, []);

//   // Disable the automatic end date recalculation if we already have an end date from the previous form
//   useEffect(() => {
//     // Disabling automatic recalculation based on amount changes
//     // Only recalculate end date if specifically changing values in THIS form
//     // and no end date was provided from previous form
//     if (
//       !formValues.endDate && // Only if we don't already have an end date from previous form
//       formik.values.startDate &&
//       formik.values.frequency &&
//       formik.values.targetAmount &&
//       formik.values.monthlyContribution
//     ) {
//       const startDate = new Date(formik.values.startDate);
//       const targetAmount = parseFloat(
//         formik.values.targetAmount.replace(/,/g, '')
//       );
//       const contribution = parseFloat(
//         formik.values.monthlyContribution.replace(/,/g, '')
//       );

//       let endDate = new Date(startDate);

//       if (formik.values.frequency === 'daily') {
//         const daysRequired = Math.ceil(targetAmount / contribution);
//         endDate.setDate(startDate.getDate() + daysRequired);
//       } else if (formik.values.frequency === 'weekly') {
//         const weeksRequired = Math.ceil(targetAmount / contribution);
//         endDate.setDate(startDate.getDate() + weeksRequired * 7);
//       } else if (formik.values.frequency === 'monthly') {
//         const monthsRequired = Math.ceil(targetAmount / contribution);
//         endDate.setMonth(startDate.getMonth() + monthsRequired);
//       }

//       formik.setFieldValue('endDate', endDate.toISOString().split('T')[0]);
//     }
//   }, [
//     formik.values.startDate,
//     formik.values.frequency,
//     formik.values.targetAmount,
//   ]);

//   // Update the useEffect that syncs formik values to formValues
//   useEffect(() => {
//     // Ensure we have default values for boolean fields and properly formatted dates
//     const updatedValues = {
//       ...formik.values,
//       startDate: standardizeDateFormat(formik.values.startDate),
//       endDate: standardizeDateFormat(formik.values.endDate),
//       // Always use the exact formik values for these booleans
//       autoSave: formik.values.autoSave,
//       autoWithdrawal: formik.values.autoWithdrawal,
//       savingsType: savingsType || 'jompVault',
//     };

//     // If autoSave is false, we don't need preferredTime
//     if (updatedValues.autoSave === false) {
//       formik.setFieldValue('preferredTime', '');
//     }

//     setFormValues(updatedValues);
//   }, [formik.values, savingsType]);

//   const initializePaystack = () => {
//     const token = getTokenDetails();
//     const decodedToken = decodeToken<any>(token!);
//     const emailAddress =
//       decodedToken[
//         'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
//       ];

//     chargeAndVerifyCard(
//       emailAddress,
//       async ({ authCode, reference }) => {
//         try {
//           // Save the auth code
//           const updatedValues = {
//             ...formik.values,
//             cardToken: authCode,
//           };

//           formik.setFieldValue('cardToken', authCode);
//           setFormValues(updatedValues);

//           // Show success message
//           toast.success('Card setup successful!');

//           // Log the process
//           console.log('Card setup complete:', {
//             authCode,
//             reference,
//             message: 'Card verified and refund initiated',
//           });
//         } catch (error) {
//           console.error('Error in card setup process:', error);
//           toast.error('Card setup failed. Please try again.');
//         }
//       },
//       () => {
//         console.log('Payment window closed');
//       }
//     );
//   };

//   const handleSourceSelection = (name: string, option: OptionType | null) => {
//     if (option) {
//       formik.setFieldValue(name, option.label);

//       // If Card is selected as payment source, show the disclaimer
//       if (option.label === 'Card') {
//         setShowCardDisclaimer(true);
//       }

//       // If Wallet is selected as payment source, fetch wallet balance and show modal
//       if (option.label === 'Wallet') {
//         setShowWalletBalanceModal(true);
//       }
//     }
//   };

//   // Handle proceeding with card payment after disclaimer acknowledgment
//   const handleProceedWithCard = () => {
//     setShowCardDisclaimer(false);

//     // Check if the required Paystack script is loaded
//     if (typeof window.PaystackPop === 'undefined') {
//       const script = document.createElement('script');
//       script.src = 'https://js.paystack.co/v1/inline.js';
//       script.async = true;
//       script.onload = () => {
//         initializePaystack();
//       };
//       document.body.appendChild(script);
//     } else {
//       initializePaystack();
//     }
//   };

//   // Wallet Balance Modal Component

//   useEffect(() => {
//     // Validate the start date when component mounts
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     if (formik.values.startDate) {
//       const startDate = new Date(formik.values.startDate);
//       startDate.setHours(0, 0, 0, 0);

//       // If start date is in the past, update it to today
//       if (startDate < today) {
//         const formattedDate = today.toISOString().split('T')[0];
//         formik.setFieldValue('startDate', formattedDate);

//         // Also update end date if needed
//         if (formik.values.endDate) {
//           const endDate = new Date(formik.values.endDate);
//           if (endDate <= today) {
//             // Set end date to a reasonable future date (e.g., 1 month from today)
//             const newEndDate = new Date(today);
//             newEndDate.setMonth(today.getMonth() + 1);
//             formik.setFieldValue(
//               'endDate',
//               newEndDate.toISOString().split('T')[0]
//             );
//           }
//         }
//       }
//     }
//   }, []);

//   // Add this useEffect after the formik initialization
//   useEffect(() => {
//     // Format dates immediately when component loads
//     if (formik.values.startDate) {
//       const formattedStartDate = standardizeDateFormat(formik.values.startDate);
//       if (
//         formattedStartDate &&
//         formattedStartDate !== formik.values.startDate
//       ) {
//         formik.setFieldValue('startDate', formattedStartDate);
//       }
//     }

//     if (formik.values.endDate) {
//       const formattedEndDate = standardizeDateFormat(formik.values.endDate);
//       if (formattedEndDate && formattedEndDate !== formik.values.endDate) {
//         formik.setFieldValue('endDate', formattedEndDate);
//       }
//     }

//     // Log the formatted values for debugging
//     console.log('Initial formatted dates:', {
//       startDate: formik.values.startDate,
//       endDate: formik.values.endDate,
//     });
//   }, []);

//   // Add function to validate and prepare data for submission
//   const validateFormBeforeSubmit = () => {
//     // Initialize validation variables
//     let isValid = true;
//     let errorMessage = '';

//     // Validate dates first
//     const startDate = standardizeDateFormat(formik.values.startDate);
//     const endDate = standardizeDateFormat(formik.values.endDate);

//     // Update formik values with properly formatted dates
//     formik.setFieldValue('startDate', startDate);
//     formik.setFieldValue('endDate', endDate);

//     // Verify dates are valid and in the future
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     // const formattedStartDate = new Date(startDate);
//     // formattedStartDate.setHours(0, 0, 0, 0);

//     // if (formattedStartDate < today) {
//     //   toast.error('Start date must be today or in the future');
//     //   return false;
//     // }

//     // Ensure both dates are valid
//     if (!startDate || !endDate) {
//       toast.error('Both start and end dates are required');
//       return false;
//     }

//     // Validate saving source
//     if (!formik.values.savingSource) {
//       isValid = false;
//       errorMessage = 'Please select a saving source';
//     }

//     // Check if card token is empty when Card is selected as payment source
//     if (
//       formik.values.savingSource === 'Card' &&
//       (!formik.values.cardToken || formik.values.cardToken === '')
//     ) {
//       toast.error('Card details are required. Please complete the card setup.');
//       return false;
//     }

//     // Validate agreement checkboxes
//     if (!formik.values.interestTagentSaving) {
//       isValid = false;
//       errorMessage = 'You must agree to the interest terms';
//     }

//     // Show error if validation fails
//     if (!isValid) {
//       toast.error(errorMessage);
//       return false;
//     }

//     return true;
//   };

//   // Add a lifecycle hook to standardize date formats when component mounts
//   useEffect(() => {
//     // Only run once on mount - no dependencies
//     // When component first loads, use the dates exactly as received from previous form

//     // Just directly use the dates from formValues without any conversion
//     if (formValues?.startDate) {
//       formik.setFieldValue('startDate', formValues.startDate, false);
//     }

//     if (formValues?.endDate) {
//       formik.setFieldValue('endDate', formValues.endDate, false);
//     }
//   }, []);

//   // Add this useEffect right after formik initialization
//   useEffect(() => {
//     // Explicitly set autoSave and autoWithdrawal to false on initial load
//     formik.setFieldValue('autoSave', false);
//     formik.setFieldValue('autoWithdrawal', false);

//     // Also update formValues to ensure the summary component gets the correct values
//     setFormValues({
//       ...formValues,
//       autoSave: false,
//       autoWithdrawal: false,
//     });

//     // Log initial values for debugging
//   }, []);

//   useEffect(() => {
//     const fetchInterestRate = async () => {
//       try {
//         // Check if we already have the interest rate in the Redux store
//         if (interestRate > 0) {
//           return;
//         }

//         // If not in store, fetch from API
//         const { data } = await appAxios.get('/get-savings-type');
//         if (data && data.success) {
//           const jompVaultData = data.data.find(
//             (item: any) => item.name === 'jompVault'
//           );
//           if (jompVaultData) {
//             const rate = jompVaultData.interestRate;
//             dispatch(savingsSlice.actions.setInterestRate(rate));
//           }
//         }
//       } catch (error) {
//         console.error('Error fetching interest rate:', error);
//       }
//     };

//     fetchInterestRate();
//   }, [dispatch, interestRate]);

//   useEffect(() => {
//     // When component first mounts, check if startDate or endDate is empty
//     // and try to recover from localStorage if possible
//     if (!formValues.startDate || !formValues.endDate) {
//       try {
//         const savedValues = localStorage.getItem('jompSavingsFormValues');
//         if (savedValues) {
//           const parsedValues = JSON.parse(savedValues);
//           console.log('Recovered form values from localStorage:', parsedValues);

//           // If we have valid dates in localStorage, use them
//           if (parsedValues.startDate && !formValues.startDate) {
//             formik.setFieldValue('startDate', parsedValues.startDate);
//             console.log(
//               'Recovered startDate from localStorage:',
//               parsedValues.startDate
//             );
//           }

//           if (parsedValues.endDate && !formValues.endDate) {
//             formik.setFieldValue('endDate', parsedValues.endDate);
//             console.log(
//               'Recovered endDate from localStorage:',
//               parsedValues.endDate
//             );
//           }

//           // Also update formValues directly to ensure it's available immediately
//           if (
//             (parsedValues.startDate && !formValues.startDate) ||
//             (parsedValues.endDate && !formValues.endDate)
//           ) {
//             setFormValues({
//               ...formValues,
//               startDate: parsedValues.startDate || formValues.startDate,
//               endDate: parsedValues.endDate || formValues.endDate,
//             });
//           }
//         }
//       } catch (error) {
//         console.error('Error recovering form data from localStorage:', error);
//       }
//     }
//   }, []);

//   // Force-set default dates if still empty after recovery attempt
//   useEffect(() => {
//     const checkAndSetDefaultDates = () => {
//       let needsUpdate = false;
//       const updatedValues = { ...formik.values };

//       if (!updatedValues.startDate || updatedValues.startDate === '') {
//         const today = new Date();
//         updatedValues.startDate = today.toISOString();
//         needsUpdate = true;
//       }

//       if (!updatedValues.endDate || updatedValues.endDate === '') {
//         const startDate = new Date(updatedValues.startDate);
//         startDate.setMonth(startDate.getMonth() + 1);
//         updatedValues.endDate = startDate.toISOString();
//         needsUpdate = true;
//       }

//       if (needsUpdate) {
//         console.log('Setting default dates:', {
//           startDate: updatedValues.startDate,
//           endDate: updatedValues.endDate,
//         });

//         formik.setValues(updatedValues);
//         setFormValues(updatedValues);
//       }
//     };

//     // Run this check after component is fully mounted
//     setTimeout(checkAndSetDefaultDates, 300);
//   }, []);

//   // Add this final validation function
//   const ensureValidDates = (data: any) => {
//     // Make a copy to avoid mutating the original object
//     const updatedData = { ...data };

//     // Check and set startDate if empty
//     if (!updatedData.startDate || updatedData.startDate === '') {
//       console.warn(
//         'startDate is empty in final submission, setting default value'
//       );
//       updatedData.startDate = new Date().toISOString();
//     }

//     // Check and set endDate if empty
//     if (!updatedData.endDate || updatedData.endDate === '') {
//       console.warn(
//         'endDate is empty in final submission, setting default value'
//       );
//       const startDate = new Date(updatedData.startDate);
//       startDate.setMonth(startDate.getMonth() + 1);
//       updatedData.endDate = startDate.toISOString();
//     }

//     return updatedData;
//   };

//   // Wrap the original handleDataSubmit to ensure dates are valid
//   const originalHandleDataSubmit = handleDataSubmit;
//   const wrappedHandleDataSubmit = () => {
//     console.log('Intercepting handleDataSubmit to ensure valid dates');
//     console.log('Current formValues:', formValues);

//     // Update formValues with validated dates before submission
//     const validatedFormValues = ensureValidDates(formValues);

//     // Add idempotency key to the form data
//     const formDataWithIdempotency = {
//       ...validatedFormValues,
//       idempotencyKey: idempotencyKey,
//     };

//     setFormValues(formDataWithIdempotency);

//     // Small timeout to ensure state is updated before proceeding
//     setTimeout(() => {
//       if (typeof originalHandleDataSubmit === 'function') {
//         originalHandleDataSubmit();
//         // Generate a new idempotency key after submission
//         setIdempotencyKey(uuidv4());
//       }
//     }, 50);
//   };

//   const handleSubmitCreateSavings = (e: React.FormEvent) => {
//     e.preventDefault();

//     // Set default start date if empty
//     if (!formik.values.startDate) {
//       const today = new Date();
//       const formattedToday = standardizeDateFormat(today.toISOString());
//       formik.setFieldValue('startDate', formattedToday);
//       console.log('Setting default start date:', formattedToday);
//     }

//     // Validate the form before submission
//     if (!validateFormBeforeSubmit()) {
//       return;
//     }

//     // Set loading state
//     setIsSubmitting(true);

//     // First ensure dates are in standard format
//     let startDateForSubmission, endDateForSubmission;

//     try {
//       // For start date - ensure it's not empty
//       if (!formik.values.startDate) {
//         // Set to today's date as fallback
//         const today = new Date();
//         startDateForSubmission = today.toISOString();
//       } else if (formik.values.startDate?.includes('/')) {
//         // Parse DD/MM/YYYY format
//         const [day, month, year] = formik.values.startDate
//           .split('/')
//           .map(Number);
//         const date = new Date(year, month - 1, day);
//         if (!isNaN(date.getTime())) {
//           startDateForSubmission = date.toISOString();
//         } else {
//           console.error(
//             'Invalid start date for ISO conversion:',
//             formik.values.startDate
//           );
//           toast.error('Invalid start date format');
//           setIsSubmitting(false);
//           return;
//         }
//       } else {
//         // Try direct conversion
//         const date = new Date(formik.values.startDate);
//         if (!isNaN(date.getTime())) {
//           startDateForSubmission = date.toISOString();
//         } else {
//           console.error(
//             'Invalid start date for direct conversion:',
//             formik.values.startDate
//           );
//           toast.error('Invalid start date format');
//           setIsSubmitting(false);
//           return;
//         }
//       }

//       // For end date
//       if (!formik.values.endDate) {
//         // Set default end date (1 month from start)
//         const startDate = new Date(startDateForSubmission);
//         startDate.setMonth(startDate.getMonth() + 1);
//         endDateForSubmission = startDate.toISOString();
//       } else if (formik.values.endDate?.includes('/')) {
//         // Parse DD/MM/YYYY format
//         const [day, month, year] = formik.values.endDate.split('/').map(Number);
//         const date = new Date(year, month - 1, day);
//         if (!isNaN(date.getTime())) {
//           // Ensure proper ISO format with timezone
//           date.setHours(0, 0, 0, 0);
//           endDateForSubmission = date.toISOString();
//         } else {
//           console.error(
//             'Invalid end date for ISO conversion:',
//             formik.values.endDate
//           );
//           toast.error('Invalid end date format');
//           setIsSubmitting(false);
//           return;
//         }
//       } else {
//         // Try direct conversion
//         const date = new Date(formik.values.endDate);
//         if (!isNaN(date.getTime())) {
//           // Ensure proper ISO format with timezone
//           date.setHours(0, 0, 0, 0);
//           endDateForSubmission = date.toISOString();
//         } else {
//           console.error(
//             'Invalid end date for direct conversion:',
//             formik.values.endDate
//           );
//           toast.error('Invalid end date format');
//           setIsSubmitting(false);
//           return;
//         }
//       }

//       console.log('Date conversion for submission:', {
//         originalStartDate: formik.values.startDate,
//         convertedStartDate: startDateForSubmission,
//         originalEndDate: formik.values.endDate,
//         convertedEndDate: endDateForSubmission,
//       });

//       const finalValues = {
//         ...formik.values,
//         startDate: startDateForSubmission,
//         endDate: endDateForSubmission,
//         savingsTime: formik.values.preferredTime,
//         savingsType: 'jompVault',
//       };

//       // Double check dates are not empty
//       const validatedValues = ensureValidDates(finalValues);

//       console.log('Final values with dates:', validatedValues);
//       setFormValues(validatedValues);

//       // Clear localStorage on submission
//       clearFormFromLocalStorage();

//       setTimeout(() => {
//         wrappedHandleDataSubmit();
//       }, 0);
//     } catch (error) {
//       console.error('Error processing dates for submission:', error);
//       toast.error('Error processing dates. Please try again.');
//       setIsSubmitting(false);
//     }
//   };
//   return (
//     <div className="flex flex-col gap-[30px] w-full text-BrandGray900">
//       <div className="flex flex-col gap-y-[10px] mb-[30px]">
//         <div className="flex flex-col justify-between items-center lg:flex-row">
//           <div className="mb-4 lg:mb-0">
//             <h1 className="font-semibold">
//               Create a JompVault Target Savings.
//             </h1>
//             <p>
//               Set up a new savings target and get paid everyday (@{' '}
//               {interestRate || 12}% interest per annum) to reach your goals
//               faster.
//             </p>
//           </div>
//         </div>
//       </div>
//       {/* ********************************** */}
//       <div className="flex flex-col-reverse gap-y-[20px] lg:flex-row lg:gap-x-[50px]">
//         <main className=" flex-1 bg-white rounded-md px-[15px] py-[20px] lg:w-[60%]">
//           <header className="flex flex-col gap-y-[3px] mb-[20px]">
//             <h1 className="font-semibold text-[20px]">Finish Setting Up</h1>
//             <p>Finalize your target settings</p>
//             <div className="h-[1px] bg-gray-3 mt-[10px] mb-[25px]"></div>
//           </header>
//           <form action="" className="flex flex-col gap-y-[20px]">
//             <div className="flex flex-col gap-y-[2px]">
//               <label htmlFor="autoSave">
//                 Do you want to enable auto savings?
//               </label>

//               <div className="flex gap-3">
//                 <div
//                   className={`flex items-center cursor-pointer w-[40px] h-[20px] rounded-full transition-all 
//                   ${formik.values.autoSave ? 'bg-[#EFA005]' : 'bg-gray-300'}`}
//                   onClick={() => {
//                     const newValue = !formik.values.autoSave;
//                     formik.setFieldValue('autoSave', newValue);
//                     // Immediately update formValues as well
//                     setFormValues({
//                       ...formValues,
//                       autoSave: newValue,
//                     });
//                   }}
//                 >
//                   <div
//                     className={`w-[25px] h-[25px] bg-white rounded-full shadow-md transform transition-all 
//                     ${formik.values.autoSave ? 'translate-x-[15px]' : 'translate-x-0'}`}
//                   />
//                 </div>
//                 <p className="mt-1 text-sm">
//                   {formik.values.autoSave ? 'Yes' : 'No'}
//                 </p>
//               </div>
//             </div>

//             <div>
//               {formik.values.autoSave && (
//                 <InputField
//                   label="Preferred Time"
//                   type="time"
//                   name="preferredTime"
//                   placeholder="e.g 4:30 am"
//                   value={formik.values.preferredTime || ''}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   error={
//                     formik.touched.preferredTime
//                       ? formik.errors.preferredTime
//                       : undefined
//                   }
//                 />
//               )}
//             </div>

//             <div className="flex-col w-full">
//               <div className="flex gap-5 w-full">
//                 <div className="w-full">
//                   <SelectInput
//                     label="Saving Source"
//                     name="savingSource"
//                     placeholder="Select saving source"
//                     onChange={handleSourceSelection}
//                     options={sourceOptions}
//                     value={
//                       sourceOptions.find(
//                         (option) => option.label === formik.values.savingSource
//                       ) || null
//                     }
//                     required
//                     error={
//                       formik.touched.savingSource
//                         ? formik.errors.savingSource
//                         : undefined
//                     }
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="flex flex-col gap-y-[2px]">
//               <label htmlFor="autoWithdrawal">
//                 Do you want to enable auto withdrawal at the end of your savings
//                 duration?
//               </label>

//               <div className="flex gap-3">
//                 <div
//                   className={`flex items-center cursor-pointer w-[40px] h-[20px] rounded-full transition-all 
//                   ${formik.values.autoWithdrawal ? 'bg-[#EFA005]' : 'bg-gray-300'}`}
//                   onClick={() => {
//                     const newValue = !formik.values.autoWithdrawal;
//                     formik.setFieldValue('autoWithdrawal', newValue);
//                     // Immediately update formValues as well
//                     setFormValues({
//                       ...formValues,
//                       autoWithdrawal: newValue,
//                     });
//                   }}
//                 >
//                   <div
//                     className={`w-[25px] h-[25px] bg-white rounded-full shadow-md transform transition-all 
//                     ${formik.values.autoWithdrawal ? 'translate-x-[15px]' : 'translate-x-0'}`}
//                   />
//                 </div>
//                 <p className="mt-1 text-sm">
//                   {formik.values.autoWithdrawal ? 'Yes' : 'No'}
//                 </p>
//               </div>
//             </div>

//             {/* Agreements */}
//             <div className="flex flex-col space-y-2">
//               <Checkbox
//                 id="interestTagentSaving"
//                 label="I hereby agree that I will be charged 20% of the interest I have earned so far:"
//                 labelSubText="1) Whenever I withdraw any amount before my maturity date."
//                 labelSubTextTwo="2) If I do not meet my savings target at maturity date."
//                 checked={isInterestTargetChecked}
//                 onChange={(e) => {
//                   const checked = (e.target as HTMLInputElement).checked;
//                   setIsInterestTargetChecked(checked);
//                   formik.setFieldValue('interestTagentSaving', checked);
//                 }}
//                 className="mb-4 text-sm"
//               />
//               {formik.touched.interestTagentSaving &&
//                 formik.errors.interestTagentSaving && (
//                   <p className="text-xs text-red-500">
//                     {formik.errors.interestTagentSaving as string}
//                   </p>
//                 )}
//             </div>

//             <div className="h-[1px] bg-gray-3 mt-[10px] mb-[25px]"></div>

//             <div className="flex justify-end gap-x-[20px]">
//               <button
//                 onClick={handleBack}
//                 className="border border-[#EFA005] px-12 py-2 rounded-[8px] outline-none focus:shadow-md text-[#EFA005]"
//                 disabled={isSubmitting}
//               >
//                 Back
//               </button>
//               <Button
//                 type="button"
//                 className={`outline-none ${!isInterestTargetChecked || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
//                 disabled={!isInterestTargetChecked || isSubmitting}
//                 onClick={handleSubmitCreateSavings}
//               >
//                 {isSubmitting ? 'Creating...' : 'Create Savings'}
//               </Button>
//             </div>
//           </form>
//         </main>

//         <SavingsSummary formValues={formValues} />
//       </div>

//       {/* Add the CardDisclaimerModal */}
//       <CardDisclaimerModal
//         isOpen={showCardDisclaimer}
//         onClose={() => setShowCardDisclaimer(false)}
//         onProceed={handleProceedWithCard}
//       />

//       {/* Add the WalletBalanceModal */}
//       <WalletBalanceModal
//         showWalletBalanceModal={showWalletBalanceModal}
//         setShowWalletBalanceModal={setShowWalletBalanceModal}
//         formValues={formValues}
//         formik={formik}
//         setFormValues={setFormValues}
//       />

//       {/* Add the FundWalletModal */}
//     </div>
//   );
// }

// export default FinishSavingsTarget;


export const payWithPaystack = (
  email: string,
  onSuccess: (response: any) => void,
  onClose?: () => void
) => {
  if (!email) {
    console.error('Email is required');
    return;
  }

  //@ts-ignore
  if (typeof PaystackPop === 'undefined') {
    console.error('Paystack SDK not loaded');
    return;
  }

  //@ts-ignore
  const handler = PaystackPop.setup({
    key: process.env.REACT_APP_PAYSTACK_PUBLICK_KEY,
    email: email,
    amount: 5 * 100,
    currency: 'NGN',
    channels: ['card'],
    ref: 'txn-' + Math.floor(Math.random() * 1000000000 + 1),
    callback: (response: any) => {
      if (response.reference) {
        console.log('Payment successful:', response);
        onSuccess(response);
      } else {
        console.error('Transaction failed:', response);
      }
    },
    onClose: () => {
      console.warn('Payment window closed');
      if (onClose) onClose();
    },
  });

  handler.openIframe();
};

/**
 * Validates and tokenizes a card with a minimal amount (₦100)
 * This function is used when you only need to verify and save a card for future use
 * without charging the full payment amount
 */
export const verifyAndTokenizeCard = (
  email: string,
  onSuccess: (response: any) => void,
  onClose?: () => void
) => {
  if (!email) {
    console.error('Email is required');
    return;
  }

  //@ts-ignore
  if (typeof PaystackPop === 'undefined') {
    console.error('Paystack SDK not loaded');
    return;
  }

  const validationAmount = 5;

  //@ts-ignore
  const handler = PaystackPop.setup({
    key: process.env.REACT_APP_PAYSTACK_PUBLICK_KEY,
    email: email,
    amount: validationAmount * 100, // Convert to kobo (100 naira)
    currency: 'NGN',
    channels: ['card'],
    ref: 'verify-' + Math.floor(Math.random() * 1000000000 + 1),
    callback: (response: any) => {
      if (response.reference) {
        console.log('Card verification successful:', response);
        onSuccess(response);
      } else {
        console.error('Card verification failed:', response);
      }
    },
    onClose: () => {
      console.warn('Card verification window closed');
      if (onClose) onClose();
    },
  });

  handler.openIframe();
};

interface PaymentResponse {
  reference: string;
  status: string;
}

interface RefundResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    transaction: string;
    amount: number;
    currency: string;
    status: string;
  };
}

export const chargeAndVerifyCard = (
  email: string,
  onSuccess: (response: { authCode: string; reference: string }) => void,
  onClose?: () => void
) => {
  if (!email) {
    console.error('Email is required');
    return;
  }

  //@ts-ignore
  if (typeof PaystackPop === 'undefined') {
    console.error('Paystack SDK not loaded');
    return;
  }

  const amount = 50; // 50 Naira

  //@ts-ignore
  const handler = PaystackPop.setup({
    key: process.env.REACT_APP_PAYSTACK_PUBLICK_KEY,
    email: email,
    amount: amount * 100, // 5000 kobo
    currency: 'NGN',
    channels: ['card'],
    ref: 'txn-' + Math.floor(Math.random() * 1000000000 + 1),
    callback: function(response: PaymentResponse) {
      if (response.reference) {
        // Handle verification and refund in a separate function
        handleVerificationAndRefund(response.reference)
          .then(({ authCode }) => {
            onSuccess({ 
              authCode, 
              reference: response.reference 
            });
          })
          .catch((error) => {
            console.error('Error in verification/refund process:', error);
            throw error;
          });
      }
    },
    onClose: () => {
      console.warn('Payment window closed');
      if (onClose) onClose();
    },
  });

  handler.openIframe();
};

// Separate function to handle verification and refund
const handleVerificationAndRefund = async (reference: string) => {
  try {
    // Verify transaction to get auth code
    const verificationResponse = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_PAYSTACK_SECRET_KEY}`,
        }
      }
    );

    const verificationData = await verificationResponse.json();

    if (verificationData.status && verificationData.data.authorization) {
      const authCode = verificationData.data.authorization.authorization_code;
      
      // Initiate refund
      await initiateRefund(reference);
      
      return { authCode };
    } else {
      throw new Error('Failed to get authorization code');
    }
  } catch (error) {
    console.error('Error in verification/refund process:', error);
    throw error;
  }
};

export const initiateRefund = async (
  transactionReference: string,
  amount: number = 50 // 50 Naira
): Promise<RefundResponse> => {
  try {
    const response = await fetch('https://api.paystack.co/refund', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        transaction: transactionReference,
        amount: amount * 100 // 5000 kobo
      })
    });

    const data = await response.json();

    if (!data.status) {
      throw new Error(data.message || 'Refund failed');
    }

    return data;
  } catch (error) {
    console.error('Error initiating refund:', error);
    throw error;
  }
};