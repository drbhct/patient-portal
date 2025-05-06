export const validateRequired = (value, field) => {
  if (!value || (typeof value === 'string' && !value.trim())) {
    return `${field} is required`
  }
  return ''
}

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email) return 'Email is required'
  if (!emailRegex.test(email)) return 'Please enter a valid email address'
  return ''
}

export const validateCardNumber = (number) => {
  // Remove spaces and dashes
  const cleanNumber = number.replace(/[\s-]/g, '')

  // Check if it's a valid length
  if (!/^\d{16}$/.test(cleanNumber)) {
    return 'Please enter a valid 16-digit card number'
  }

  // Luhn algorithm for card validation
  let sum = 0
  let isEven = false

  // Loop through values starting from the rightmost digit
  for (let i = cleanNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanNumber.charAt(i))

    if (isEven) {
      digit *= 2
      if (digit > 9) {
        digit -= 9
      }
    }

    sum += digit
    isEven = !isEven
  }

  if (sum % 10 !== 0) {
    return 'Please enter a valid card number'
  }

  return ''
}

export const validateExpiryDate = (date) => {
  if (!date) return 'Expiry date is required'

  const [month, year] = date.split('/')
  if (!month || !year) return 'Please enter a valid expiry date (MM/YY)'

  const currentDate = new Date()
  const currentYear = currentDate.getFullYear() % 100
  const currentMonth = currentDate.getMonth() + 1

  const expMonth = parseInt(month)
  const expYear = parseInt(year)

  if (expMonth < 1 || expMonth > 12) {
    return 'Please enter a valid month (01-12)'
  }

  if (
    expYear < currentYear ||
    (expYear === currentYear && expMonth < currentMonth)
  ) {
    return 'Card has expired'
  }

  return ''
}

export const validateCVV = (cvv) => {
  if (!cvv) return 'CVV is required'
  if (!/^\d{3,4}$/.test(cvv)) return 'Please enter a valid CVV'
  return ''
}

export const validateAmount = (amount) => {
  if (!amount) return 'Amount is required'
  const numAmount = parseFloat(amount)
  if (isNaN(numAmount) || numAmount <= 0) {
    return 'Please enter a valid amount'
  }
  return ''
}

export const validatePhone = (phone) => {
  if (!phone) return 'Phone number is required'
  const phoneRegex = /^\+?[\d\s-]{10,}$/
  if (!phoneRegex.test(phone)) {
    return 'Please enter a valid phone number'
  }
  return ''
}

export const validateZipCode = (zip) => {
  if (!zip) return 'ZIP code is required'
  const zipRegex = /^\d{5}(-\d{4})?$/
  if (!zipRegex.test(zip)) {
    return 'Please enter a valid ZIP code'
  }
  return ''
}
