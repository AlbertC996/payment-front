'use client';

import { useState } from 'react';
import { OrderData, CreateOrderResponse } from '../types';

export const usePaymentForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [orderData, setOrderData] = useState<OrderData>({
    from: '',
    to: '',
    amount: '0',
    address: '',
    country: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setOrderData({ ...orderData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/changenow/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...orderData, externalUserId: `user-${Date.now()}` }),
      });

      const data: CreateOrderResponse = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.details || 'Failed to create order');
      }

      setResult(`Redirecting to secure payment page...\n\nIf you are not redirected automatically, please click the link:\n${data.payUrl}`);
      setTimeout(() => {
        if (data.payUrl) {
          window.location.href = data.payUrl;
        }
      }, 2000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return {
    currentStep,
    orderData,
    loading,
    result,
    error,
    handleInputChange,
    handleSubmit,
    nextStep,
    prevStep,
  };
};