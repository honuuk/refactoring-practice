function disabilityAmount(anEmployee) {
  if (isNotEligibleForDisability()) return 0;
  // 장애 수당 개선

  function isNotEligibleForDisability() {
    return (anEmployee.seniority < 2 
            || anEmployee.monthsDisabled > 12 
            || anEmployee.isPartTime);
  }
}