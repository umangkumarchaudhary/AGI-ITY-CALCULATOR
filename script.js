const calculateButton = document.getElementById('calculate');
const savePdfButton = document.getElementById('save-pdf');

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

    // Calculate values
    const netExShowroom = exShowroom - upfrontDiscount;
    document.getElementById('net-ex-showroom').value = netExShowroom.toFixed(2);

    const financeOnAsset = (financePercentage / 100) * netExShowroom;
    document.getElementById('finance-on-asset').value = financeOnAsset.toFixed(2);

    const totalFinance = financeOnAsset + maintenance + extendedWarranty + additionalFinance;
    document.getElementById('total-finance').value = totalFinance.toFixed(2);

    const ltv = (totalFinance / netExShowroom) * 100;
    document.getElementById('ltv').value = ltv.toFixed(2) + "%";

    const commissionPloughback = (commissionPercentage / 100) * totalFinance;
    document.getElementById('commission-ploughback').value = commissionPloughback.toFixed(2);

    const manufacturerSubvention = parseFloat(document.getElementById('manufacturer-subvention').value) || 0;
    const dealerSubvention = parseFloat(document.getElementById('dealer-subvention').value) || 0;
    const totalSubvention = manufacturerSubvention + dealerSubvention;
    document.getElementById('total-subvention').value = totalSubvention.toFixed(2);

    const balloonAmount = (balloonPercentage / 100) * netExShowroom;
    document.getElementById('balloon-amount').value = balloonAmount.toFixed(2);

    const principal = totalFinance - balloonAmount;
    const monthlyRate = dfsRate / 12 / 100;
    const tenure = 36; // Example tenure
    const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, tenure) / (Math.pow(1 + monthlyRate, tenure) - 1);
    document.getElementById('emi').value = emi.toFixed(2);
});

savePdfButton.addEventListener('click', () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const formElements = Array.from(document.querySelectorAll("label, input"));
    const lineHeight = 10; // Adjust the line height
    let y = 20; // Starting Y position for text

    doc.text("Agility Calculator", 20, y);
    y += 10;

    // Loop through the form elements and add them to the PDF
    formElements.forEach((el) => {
        if (el.tagName === "LABEL") {
            doc.text(el.textContent, 10, y); // Add label text
        } else if (el.tagName === "INPUT") {
            doc.text(el.value || "-", 100, y); // Add input value (or dash if empty)
            y += lineHeight;
        }

        // Check if the content exceeds the page height
        if (y > 280) {
            doc.addPage();
            y = 20; // Reset Y position for the new page
        }
    });

    // Save the PDF
    doc.save("Agility_Calculator.pdf");
});

