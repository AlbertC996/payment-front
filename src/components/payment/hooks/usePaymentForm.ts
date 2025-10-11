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
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL ?? ""}/changenow/create-order`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: orderData.from,
          to: orderData.to,
          amount: orderData.amount,
          address: orderData.address,
          externalUserId: `user-${Date.now()}`,
          country: orderData.country,
          paymentMethod: 'card',
          email: orderData.email,
        })
      });

      const data: CreateOrderResponse = await response.json();

      if (!response.ok || !data.success) {
        setError(data.details || '   ');
        return;
      }

      setResult(`     ...\n\n          :\n${data.payUrl}`);
      setTimeout(() => {
        if (data.payUrl) {
          window.location.href = data.payUrl;
        }
      }, 2000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
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
