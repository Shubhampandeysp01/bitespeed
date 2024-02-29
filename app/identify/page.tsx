'use client'
import React, { useState, ChangeEvent, FormEvent } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from "next/navigation";

export default function identify() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(event.target.value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/identify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ phoneNumber, email })
      });
      const responseText = await response.text();
      
      setResponse(responseText);
  
      router.refresh(); 
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }

    setPhoneNumber('');
    setEmail('');
  };

  return (
    <main className="flex min-h-screen flex-col items-left justify-between p-24">
      <h1 className="underline">/identify</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            id="phoneNumber"
            label="Phone Number"
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            variant="outlined"
            style={{ marginRight: '1rem' }}
          />
          <TextField
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            variant="outlined"
            style={{ marginRight: '1rem' }}
          />
          <Button 
            variant="contained" 
            style={{ backgroundColor: '#1976d2', color: 'white' }}
            type="submit"
          >
            {loading ? <CircularProgress size={24} style={{ color: 'white' }} /> : 'Submit'}
          </Button>
        </div>
      </form>
      <TextField
        id="response"
        label="Response"
        multiline
        rows={6}
        value={response || ''}
        variant="outlined"
        fullWidth
        InputProps={{
          readOnly: true,
        }}
      />
    </main>
  );
}
