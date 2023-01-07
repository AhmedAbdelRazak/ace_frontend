/** @format */

// eslint-disable-next-line
var today = new Date().toDateString("en-US", {
	timeZone: "Africa/Cairo",
});

var yesterday = new Date();
var last7Days = new Date();
var last30Days = new Date();
var last90Days = new Date();

yesterday.setDate(yesterday.getDate() - 1);
last7Days.setDate(last7Days.getDate() - 10);
last30Days.setDate(last30Days.getDate() - 30);
last90Days.setDate(last90Days.getDate() - 90);

export const overUncancelledRevenue = (allOrders) => {
	let overallUncancelledOrders = allOrders.filter(
		(i) => i.status !== "Cancelled" && i.status !== "Returned",
	);

	let overallUncancelledOrders2 =
		overallUncancelledOrders &&
		overallUncancelledOrders.map((i) => i.totalAmountAfterDiscount);

	const SumoverallUncancelledOrders2 = overallUncancelledOrders2.reduce(
		(a, b) => a + b,
		0,
	);

	return SumoverallUncancelledOrders2;
};

export const gettingOrderStatusSummaryRevenue = (
	OrderStatusSummary,
	passedStatus,
	day1,
	day2,
) => {
	let statusArraySummary = OrderStatusSummary.filter(
		(i) =>
			i.status === passedStatus &&
			new Date(i.orderCreationDate).setHours(0, 0, 0, 0) <=
				new Date(day1).setHours(0, 0, 0, 0) &&
			new Date(i.orderCreationDate).setHours(0, 0, 0, 0) >=
				new Date(day2).setHours(0, 0, 0, 0),
	);

	let statusArraySummaryNumbers =
		statusArraySummary &&
		statusArraySummary.map((i) => i.totalAmountAfterDiscount);

	const SumOfStatusRevenue = statusArraySummaryNumbers.reduce(
		(a, b) => a + b,
		0,
	);

	return SumOfStatusRevenue;
};

export const gettingOrderStatusSummaryCount = (
	OrderStatusSummary,
	passedStatus,
	day1,
	day2,
) => {
	let statusArraySummary = OrderStatusSummary.filter(
		(i) =>
			i.status === passedStatus &&
			new Date(i.orderCreationDate).setHours(0, 0, 0, 0) <=
				new Date(day1).setHours(0, 0, 0, 0) &&
			new Date(i.orderCreationDate).setHours(0, 0, 0, 0) >=
				new Date(day2).setHours(0, 0, 0, 0),
	);

	let statusArraySummaryNumbers =
		statusArraySummary && statusArraySummary.map((i) => i.ordersCount);

	const SumOfStatusRevenue = statusArraySummaryNumbers.reduce(
		(a, b) => a + b,
		0,
	);

	return SumOfStatusRevenue;
};

export const gettingOrderSourceSummaryCount = (
	OrderSourceSummary,
	passedStore,
) => {
	let sourceArraySummary = OrderSourceSummary.filter(
		(i) => i.status === passedStore,
	);

	let SourceArraySummaryNumbers =
		sourceArraySummary && sourceArraySummary.map((i) => i.ordersCount);

	const SumOfSourceRevenue = SourceArraySummaryNumbers.reduce(
		(a, b) => a + b,
		0,
	);

	return SumOfSourceRevenue;
};
