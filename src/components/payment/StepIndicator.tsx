interface StepIndicatorProps {
  currentStep: number;
}

export const StepIndicator = ({ currentStep }: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-center mb-6">
      {[1, 2, 3].map((step) => (
        <div key={step} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300 ${
              currentStep >= step ? 'bg-[#e34874] text-white' : 'bg-[#1a1b20] text-gray-400'
            }`}
          >
            {currentStep > step ? '✓' : step}
          </div>
          {step < 3 && (
            <div
              className={`w-12 h-1 transition-colors duration-300 ${
                currentStep > step ? 'bg-[#e34874]' : 'bg-[#1a1b20]'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};