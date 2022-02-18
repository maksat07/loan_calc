//Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){
	
	//Hide outputs
	document.getElementById('output').style.display = 'none';
	//Show loader
	document.getElementById('loader').style.display = 'block';

	setTimeout(calculateoutputs, 1000);

	e.preventDefault();

});

//Calculate outputs
function calculateoutputs(e){
	//UI переменные
	const amount = document.getElementById('amount');
	const interest = document.getElementById('interest');
	const years = document.getElementById('years');
	const monthlyPayment = document.getElementById('monthly-payment');
	const totalPayment = document.getElementById('total-payment');
	const totalInterest = document.getElementById('total-interest');

	const principal = parseFloat(amount.value);
	const calculatedInterest = parseFloat(interest.value) / 100 / 12;
	const calculatedPayments = parseFloat(years.value) * 12;

	//Вычисляем ежемесячный платеж
	const x = Math.pow(1 + calculatedInterest, calculatedPayments);
	const monthly = (principal * x * calculatedInterest) / (x - 1);

	if(isFinite(monthly)) {
		monthlyPayment.value = monthly.toFixed(2);
		totalPayment.value = (monthly * calculatedPayments).toFixed();
		totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

		//Show outputs
		document.getElementById('output').style.display = 'block';
		
		//Hide loader
		document.getElementById('loader').style.display = 'none';
	} else {
		showError('Пожалуйста введите необходимые данные');
	}
}

//Show Error
function showError(error){
	//Hide outputs
	document.getElementById('output').style.display = 'none';
	//Hide loader
	document.getElementById('loader').style.display = 'none';

	//Create a div
	const errorDiv = document.createElement('div');

	//Get elements
	const card = document.querySelector('.card');
	const heading = document.querySelector('.heading');

	//Add class
	errorDiv.className = 'alert alert-danger';

	//Create text node and append to div
	errorDiv.appendChild(document.createTextNode(error));

	//Insert error above heading
	card.appendChild(errorDiv, heading);

	//Clear error after 3 seconds
	setTimeout(clearError, 4000);
}

//Clear error
function clearError(){
	document.querySelector('.alert').remove();
}