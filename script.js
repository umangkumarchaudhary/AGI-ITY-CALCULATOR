const calculateButton = document.getElementById('calculate');

calculateButton.addEventListener('click', () => {
    const exShowroom = parseFloat(document.getElementById('ex-showroom').value) || 0;
    const upfrontDiscount = parseFloat(document.getElementById('upfront-discount').value) || 0;
    const financePercentage = parseFloat(document.getElementById('finance-percentage').value) || 0;
    const maintenance = parseFloat(document.getElementById('maintenance').value) || 0;
    const extendedWarranty = parseFloat(document.getElementById('extended-warranty').value) || 0;
    const additionalFinance = parseFloat(document.getElementById('additional-finance').value) || 0;
    const commissionPercentage = parseFloat(document.getElementById('commission-percentage').value) || 0;
    const dfsRate = parseFloat(document.getElementById('dfs-rate').value) || 0;
    const balloonPercentage = parseFloat(document.getElementById('balloon').value) || 0;

    // Calculate Net Ex-Showroom Price
    const netExShowroom = exShowroom - upfrontDiscount;
    document.getElementById('net-ex-showroom').value = netExShowroom.toFixed(2);

    // Calculate Finance on Asset
    const financeOnAsset = (financePercentage / 100) * netExShowroom;
    document.getElementById('finance-on-asset').value = financeOnAsset.toFixed(2);

    // Calculate Total Finance Amount
    const totalFinance = financeOnAsset + maintenance + extendedWarranty + additionalFinance;
    document.getElementById('total-finance').value = totalFinance.toFixed(2);

    // Calculate LTV
    const ltv = (totalFinance / netExShowroom) * 100;
    document.getElementById('ltv').value = ltv.toFixed(2) + "%";

    // Calculate Commission Ploughback
    const commissionPloughback = (commissionPercentage / 100) * totalFinance;
    document.getElementById('commission-ploughback').value = commissionPloughback.toFixed(2);

    // Calculate Total Subvention
    const manufacturerSubvention = parseFloat(document.getElementById('manufacturer-subvention').value) || 0;
    const dealerSubvention = parseFloat(document.getElementById('dealer-subvention').value) || 0;
    const totalSubvention = manufacturerSubvention + dealerSubvention;
    document.getElementById('total-subvention').value = totalSubvention.toFixed(2);

    // Calculate Balloon Payment Amount
    const balloonAmount = (balloonPercentage / 100) * netExShowroom;
    document.getElementById('balloon-amount').value = balloonAmount.toFixed(2);

    // Calculate EMI
    const principal = totalFinance - balloonAmount;
    const monthlyRate = dfsRate / 12 / 100;
    const tenure = 36; // Example tenure
    const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, tenure) / (Math.pow(1 + monthlyRate, tenure) - 1);
    document.getElementById('emi').value = emi.toFixed(2);
});
