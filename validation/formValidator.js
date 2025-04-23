const validateApplication = (data) => {
    const errors = [];
    
    if (!data.firstName) errors.push('First name is required');
    if (!data.lastName) errors.push('Last name is required');
    if (!data.email) errors.push('Email is required');
    if (!data.jobPosition) errors.push('Job position is required');
    if (!data.coverLetter) errors.push('Cover letter is required');
    
    return {
      isValid: errors.length === 0,
      errors
    };
  };
  
  module.exports = { validateApplication };