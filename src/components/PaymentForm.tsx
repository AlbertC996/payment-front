'use client';
import { usePaymentForm } from './payment/hooks/usePaymentForm';
import { StepIndicator } from './payment/StepIndicator';
import Step1CurrencySelection from './payment/Step1CurrencySelection';
import { Step2WalletInfo } from './payment/Step2WalletInfo';
import { Step3ReviewPay } from './payment/Step3ReviewPay';
import { truncateWalletAddress } from './payment/utils';

export default function PaymentForm() {
  const {
    error,
    result,
    loading,
    orderData,
    currentStep,
    prevStep,
    nextStep,
    handleSubmit,
    handleInputChange,
  } = usePaymentForm();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4">
      <div className="w-full max-w-md p-10 rounded-3xl bg-gradient-to-b from-[#313133] to-[#212123]">
        <StepIndicator currentStep={currentStep} />

        {currentStep === 1 && (
          <Step1CurrencySelection data={orderData} onChange={handleInputChange} onNext={nextStep} />
        )}

        {currentStep === 2 && (
          <Step2WalletInfo data={orderData} onChange={handleInputChange} onNext={nextStep} onBack={prevStep} />
        )}

        {currentStep === 3 && (
          <Step3ReviewPay
            data={orderData}
            loading={loading}
            onSubmit={handleSubmit}
            onBack={prevStep}
            truncateAddress={truncateWalletAddress}
            buttonStyles="paybtnStyle"
          />
        )}

        {result && (
          <div className="mt-6 p-4 bg-green-900/30 border border-green-500/50 rounded-2xl">
            <pre className="text-green-400 text-xs whitespace-pre-wrap">{result}</pre>
          </div>
        )}
        {error && (
          <div className="mt-6 p-4 bg-red-900/30 border border-red-500/50 rounded-2xl">
            <p className="text-red-400 text-xs">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}