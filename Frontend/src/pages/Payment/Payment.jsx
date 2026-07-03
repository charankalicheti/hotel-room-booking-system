import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Payment.css";

function Payment() {

  const navigate = useNavigate();

  const [payment, setPayment] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setPayment({
      ...payment,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validate = () => {

    let newErrors = {};

    if (!payment.cardName.trim()) {
      newErrors.cardName = "Card Holder Name is required";
    }

    if (!/^[0-9]{16}$/.test(payment.cardNumber)) {
      newErrors.cardNumber = "Card Number must be 16 digits";
    }

    if (!payment.expiry) {
      newErrors.expiry = "Select Expiry Date";
    }

    if (!/^[0-9]{3}$/.test(payment.cvv)) {
      newErrors.cvv = "CVV must be 3 digits";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    navigate("/booking-success");

  };

  return (
    <div className="payment-container">

      <div className="payment-card">

        <h1>Payment Details</h1>

        <p>Complete your booking payment.</p>

        <form onSubmit={handleSubmit}>

          <label>Card Holder Name</label>

          <input
            type="text"
            name="cardName"
            placeholder="Enter card holder name"
            value={payment.cardName}
            onChange={handleChange}
          />

          {errors.cardName && (
            <p className="error">{errors.cardName}</p>
          )}

          <label>Card Number</label>

          <input
            type="text"
            name="cardNumber"
            placeholder="1234567890123456"
            value={payment.cardNumber}
            onChange={handleChange}
            maxLength="16"
          />

          {errors.cardNumber && (
            <p className="error">{errors.cardNumber}</p>
          )}

          <div className="payment-row">

            <div>

              <label>Expiry Date</label>

              <input
                type="month"
                name="expiry"
                value={payment.expiry}
                onChange={handleChange}
              />

              {errors.expiry && (
                <p className="error">{errors.expiry}</p>
              )}

            </div>

            <div>

              <label>CVV</label>

              <input
                type="password"
                name="cvv"
                placeholder="123"
                value={payment.cvv}
                onChange={handleChange}
                maxLength="3"
              />

              {errors.cvv && (
                <p className="error">{errors.cvv}</p>
              )}

            </div>

          </div>

          <div className="amount-box">

            <span>Total Amount</span>

            <h2>₹3500</h2>

          </div>

          <button type="submit">
            Pay Now
          </button>

        </form>

      </div>

    </div>
  );
}

export default Payment;