'use client'

import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, FormEvent } from "react";

export default function identify() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handlePhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(event.target.value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await fetch('/api/identify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ phoneNumber, email })
      });

      router.refresh();
    } catch (error) {
      console.error(error);
    }

    setPhoneNumber('');
    setEmail('');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>/identify</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="phoneNumber">Phone Number: </label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
