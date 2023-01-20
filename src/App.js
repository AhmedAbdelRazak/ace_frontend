/** @format */

import React, { useEffect, useState } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "antd/dist/antd.min.css";
import ReactGA from "react-ga4";
import ReactPixel from "react-facebook-pixel";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./Footer";
import AdminRoute from "./auth/AdminRoute";
import AdminDashboard from "./Admin/AdminDashboard";
import AddGender from "./Admin/Gender/AddGender";
import UpdateGender from "./Admin/Gender/UpdateGender";
import UpdateGenderSingle from "./Admin/Gender/UpdateGenderSingle";
import DeleteGender from "./Admin/Gender/DeleteGender";
import AddCategory from "./Admin/Categories/AddCategory";
import UpdateCategory from "./Admin/Categories/UpdateCategory";
import UpdateCategorySingle from "./Admin/Categories/UpdateCategorySingle";
import DeleteCategory from "./Admin/Categories/DeleteCategory";
import AddProduct from "./Admin/Product/AddingProduct/AddProduct";
import UpdateProduct from "./Admin/Product/UpdatingProduct/UpdateProduct";
import UpdateProductSingle from "./Admin/Product/UpdatingProduct/UpdateProductSingle";
import DeleteProduct from "./Admin/Product/DeleteProduct";
import AddSubcategory from "./Admin/Subcategory/AddSubcategory";
// eslint-disable-next-line
import UpdateSubcategory from "./Admin/Subcategory/UpdateSubcategory";
import UpdateSubcategorySingle from "./Admin/Subcategory/UpdateSubcategorySingle";
import DeleteSubcategory from "./Admin/Subcategory/DeleteSubcategory";
import CreateNewOrder from "./Admin/Orders/CreateNewOrder/CreateNewOrder";
import AddShippingOptions from "./Admin/Orders/ShippingOptions/AddShippingOptions";
import UpdateShippingOptions from "./Admin/Orders/ShippingOptions/UpdateShippingOptions";
import UpdateShippingOptionsSingle from "./Admin/Orders/ShippingOptions/UpdateShippingOptionsSingle";
import DeleteShippOptions from "./Admin/Orders/ShippingOptions/DeleteShippOptions";
import OrdersHist from "./Admin/Orders/OrdersHist";
import SingleOrderPage from "./Admin/Orders/SingleOrderPage";
import AddEmployee from "./Admin/Employees/AddEmployee";
import MainReports from "./Admin/GQShopReports/MainReports";
import UpdateEmployee from "./Admin/Employees/UpdateEmployee";
import UpdateEmployeeSingle from "./Admin/Employees/UpdateEmployeeSingle";
import CreateColor from "./Admin/Attributes/CreateColor";
import CreateSize from "./Admin/Attributes/CreateSize";
import AddStore from "./Admin/StoreManagement/AddStore";
import UpdateStore from "./Admin/StoreManagement/UpdateStore";
import DeleteStore from "./Admin/StoreManagement/DeleteStore";
import UpdateStoreSingle from "./Admin/StoreManagement/UpdateStoreSingle";
import OrderReturn from "./Admin/Orders/OrderReturn";
import OrdersList from "./Admin/Orders/OrdersList";
import OrderExchange from "./Admin/Orders/OrderExchange";
import OrderExchangeSingle from "./Admin/Orders/OrderExchangeSingle";
import ReturnList from "./Admin/Orders/ReturnList";
import ReturnDetails from "./Admin/Orders/ReturnDetails";
import StockReport from "./Admin/GQShopReports/StockReport";
import OnlineStoreManagement from "./Admin/OnlineStore/OnlineStoreManagement";
import AddTopAds from "./Admin/OnlineStore/AddTopAds";
import UpdateTopAds from "./Admin/OnlineStore/UpdateTopAds";
import OperationsReport from "./Admin/GQShopReports/OperationsReport";
import ReturnOrExchange from "./Admin/Orders/ReturnAndExchange/ReturnOrExchange";
import UpdateOrderMiscellaneous from "./Admin/Orders/CreateNewOrder/UpdateOrderMiscellaneous";
import ExchangeList from "./Admin/Orders/ExchangeList";
import ProductList from "./Admin/OnlineStore/ProductSpecsUpdate/ProductList";
import UpdateSpecs from "./Admin/OnlineStore/ProductSpecsUpdate/UpdateSpecs";
import CouponManagement from "./Admin/OnlineStore/CouponManagement";
import AceOrdersList from "./Admin/OnlineStore/AceOrdersList";

//Store
import NavbarTop from "./Navbar/NavbarTop";
import NavbarBottom from "./Navbar/NavbarBottom";
import Home from "./pages/Home/Home";
import NavbarAds from "./Navbar/NavbarAds";
import { getAllAds } from "./Admin/apiAdmin";
import AddHeroComp from "./Admin/OnlineStore/AddHeroComp";

import SingleProduct from "./pages/SingleProduct/SingleProduct";
import ShopPageMain from "./pages/ShopPage/ShopPageMain";
import Cart from "./Checkout/Cart";
import InvoicePDF from "./Admin/Orders/InvoicePDF";
// eslint-disable-next-line
import { isAuthenticated } from "./auth";
import CheckoutMain from "./Checkout/CheckoutForm/CheckoutMain";
// eslint-disable-next-line
import GenderNav from "./Navbar/GenderNav";
import UserDashboard from "./pages/User/UserDashboard";
import PrivateRoute from "./auth/PrivateRoute";
import EditWebsite from "./Admin/OnlineStore/OnlineStorePages/EditWebsite";
import EditAboutUsPage from "./Admin/OnlineStore/OnlineStorePages/EditAboutUsPage";
import EditContactUsPage from "./Admin/OnlineStore/OnlineStorePages/EditContactUsPage";
import About from "./pages/About/About";
import AboutArabic from "./pages/About/AboutArabic";
import Contactus from "./pages/Contact/Contackus";
import ContactArabic from "./pages/Contact/ContactArabic";
import UserWishlist from "./pages/User/UserWishlist";
import AceReceiving from "./Admin/OnlineStore/AceReceiving";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookiePolicy from "./pages/CookiePolicy";
import RetExchPolicy from "./pages/RetExchPolicy";
import OnsiteOrderTaking from "./Admin/OnlineStore/OnsiteOrderTaking/OnsiteOrderTaking";
import PrintBarcodes from "./Admin/OnlineStore/PrintBarcodes/PrintBarcodes";
import SingleBarcodePage from "./Admin/OnlineStore/PrintBarcodes/SingleBarcodePage";
import Inventory from "./Admin/OnlineStore/Inventory/Inventory";
import AceReceivingLog from "./Admin/OnlineStore/AceReceivingLog";
import ReturnOrExchangeOfflineStore from "./Admin/OnlineStore/ReturnAndExchange/ReturnOrExchange";
import AceReceivingOffline from "./Admin/OnlineStore/AceReceiving/AceReceivingOffline";
import InventoryOfflineStore from "./Admin/OnlineStore/Inventory/InventoryOfflineStore";

const App = () => {
	// eslint-disable-next-line
	const [language, setLanguage] = useState("English");
	const [allAdsCombined, setAllAdsCombined] = useState([]);

	useEffect(() => {
		ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_MEASUREMENTID);
		ReactGA.send(window.location.pathname + window.location.search);

		setLanguage("English");

		// eslint-disable-next-line
	}, [window.location.pathname]);

	const languageToggle = () => {
		console.log(language);
		localStorage.setItem("lang", JSON.stringify(language));
		// window.location.reload(false);
	};

	useEffect(() => {
		languageToggle();
		// eslint-disable-next-line
	}, [language]);

	const gettingAllAds = () => {
		getAllAds().then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllAdsCombined(data[data.length - 1] && data[data.length - 1]);
			}
		});
	};

	useEffect(() => {
		// if (
		// 	isAuthenticated() &&
		// 	isAuthenticated().user &&
		// 	!window.location.pathname.includes("admin")
		// ) {
		// 	window.location.href = `${process.env.REACT_APP_MAIN_URL}/admin/dashboard`;
		// } else {
		// 	return null;
		// }

		gettingAllAds();
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (window.location.pathname.includes("/checkout")) {
			return;
		} else {
			localStorage.removeItem("PaidNow");
			localStorage.removeItem("storedData");
			localStorage.removeItem("chosenShippingOption");
			localStorage.removeItem("orderDataStored");
		}

		// eslint-disable-next-line
	}, []);

	const options = {
		autoConfig: true,
		debug: false,
	};

	useEffect(() => {
		ReactPixel.init(process.env.REACT_APP_FACEBOOK_PIXEL_ID, options);

		ReactPixel.pageView();

		// eslint-disable-next-line
	}, []);

	return (
		<BrowserRouter>
			<ToastContainer />
			{window.location.pathname.includes("admin") ? null : allAdsCombined &&
			  allAdsCombined.show_ad ? (
				<>
					<NavbarAds />
				</>
			) : null}
			{window.location.pathname.includes("admin") ? null : (
				<>
					<NavbarTop language={language} setLanguage={setLanguage} />

					<NavbarBottom chosenLanguage={language} />
				</>
			)}

			<Switch>
				<Route path='/signin' exact component={Login} />

				<Route
					path='/'
					exact
					component={() => <Home chosenLanguage={language} />}
				/>
				<Route
					path='/product/:categoryslug/:slug/:productId'
					exact
					component={SingleProduct}
				/>
				<Route path='/privacy-policy' exact component={PrivacyPolicy} />
				<Route path='/cookie-policy' exact component={CookiePolicy} />
				<Route path='/return-exchange-policy' exact component={RetExchPolicy} />
				<Route path='/user/wishlist' exact component={UserWishlist} />
				<Route path='/signup' exact component={Register} />
				<Route
					path='/our-products'
					exact
					component={() => <ShopPageMain chosenLanguage={language} />}
				/>
				<Route
					path='/cart'
					exact
					component={() => <Cart chosenLanguage={language} />}
				/>
				<Route path='/checkout' exact component={CheckoutMain} />
				{language === "Arabic" ? (
					<Route path='/contact' exact component={ContactArabic} />
				) : (
					<Route path='/contact' exact component={Contactus} />
				)}

				{language === "Arabic" ? (
					<Route path='/about' exact component={AboutArabic} />
				) : (
					<Route path='/about' exact component={About} />
				)}
				<PrivateRoute path='/user/dashboard' exact component={UserDashboard} />

				<AdminRoute path='/admin/dashboard' exact component={AdminDashboard} />
				<AdminRoute path='/admin/add-gender' exact component={AddGender} />
				<AdminRoute
					path='/admin/update-gender'
					exact
					component={UpdateGender}
				/>
				<AdminRoute
					path='/admin/update-gender/:genderId'
					exact
					component={UpdateGenderSingle}
				/>

				<AdminRoute
					path='/admin/delete-gender'
					exact
					component={DeleteGender}
				/>

				<AdminRoute path='/admin/add-category' exact component={AddCategory} />
				<AdminRoute
					path='/admin/coupon-management'
					exact
					component={CouponManagement}
				/>
				<AdminRoute path='/admin/product-specs' exact component={ProductList} />
				<AdminRoute
					path='/admin/update-specs/:productId'
					exact
					component={UpdateSpecs}
				/>

				<AdminRoute
					path='/admin/update-category'
					exact
					component={UpdateCategory}
				/>

				<AdminRoute
					path='/admin/update-category/:categoryId'
					exact
					component={UpdateCategorySingle}
				/>

				<AdminRoute
					path='/admin/delete-category'
					exact
					component={DeleteCategory}
				/>

				<AdminRoute
					path='/admin/add-subcategory'
					exact
					component={AddSubcategory}
				/>

				<AdminRoute
					path='/admin/update-subcategory'
					exact
					component={UpdateSubcategory}
				/>

				<AdminRoute
					path='/admin/update-subcategory/:subcategoryId'
					exact
					component={UpdateSubcategorySingle}
				/>

				<AdminRoute
					path='/admin/delete-subcategory'
					exact
					component={DeleteSubcategory}
				/>

				<AdminRoute path='/admin/add-product' exact component={AddProduct} />

				<AdminRoute
					path='/admin/update-product'
					exact
					component={UpdateProduct}
				/>

				<AdminRoute
					path='/admin/update-product/:productId'
					exact
					component={UpdateProductSingle}
				/>

				<AdminRoute
					path='/admin/delete-product'
					exact
					component={DeleteProduct}
				/>

				<AdminRoute
					path='/admin/add-shipping-carrier'
					exact
					component={AddShippingOptions}
				/>

				<AdminRoute
					path='/admin/update-shipping-carrier'
					exact
					component={UpdateShippingOptions}
				/>

				<AdminRoute
					path='/admin/update-shipping-carrier/:shippingId'
					exact
					component={UpdateShippingOptionsSingle}
				/>

				<AdminRoute
					path='/admin/delete-shipping-carrier'
					exact
					component={DeleteShippOptions}
				/>

				<AdminRoute
					path='/admin/create-new-order'
					exact
					component={CreateNewOrder}
				/>

				<AdminRoute
					path='/admin/update-miscellaneous-order/:orderId'
					exact
					component={UpdateOrderMiscellaneous}
				/>

				<AdminRoute path='/admin/orders-hist' exact component={OrdersHist} />
				<AdminRoute
					path='/admin/ace-orders-list'
					exact
					component={AceOrdersList}
				/>
				<AdminRoute
					path='/admin/ace-receiving'
					exact
					component={AceReceiving}
				/>
				<AdminRoute
					path='/admin/ace-receiving-log'
					exact
					component={AceReceivingLog}
				/>
				<AdminRoute
					path='/admin/ace-inventory-report'
					exact
					component={Inventory}
				/>
				<AdminRoute
					path='/admin/ace-inventory-report-offline-store'
					exact
					component={InventoryOfflineStore}
				/>
				<AdminRoute
					path='/admin/offline-order-taking'
					exact
					component={OnsiteOrderTaking}
				/>
				<AdminRoute
					path='/admin/receiving-offline-store'
					exact
					component={AceReceivingOffline}
				/>
				<AdminRoute
					path='/admin/print-barcodes'
					exact
					component={PrintBarcodes}
				/>
				<AdminRoute
					path='/admin/single-barcode/:sku'
					exact
					component={SingleBarcodePage}
				/>
				<AdminRoute
					path='/admin/single-order/:orderId'
					exact
					component={SingleOrderPage}
				/>
				<AdminRoute
					path='/admin/single-order/invoice/:orderId'
					exact
					component={InvoicePDF}
				/>
				<AdminRoute
					path='/admin/exchange-order/:orderId'
					exact
					component={OrderExchangeSingle}
				/>
				<AdminRoute path='/admin/add-employee' exact component={AddEmployee} />
				<AdminRoute
					path='/admin/gq-reports/sales'
					exact
					component={MainReports}
				/>
				<AdminRoute
					path='/admin/gq-reports/stock'
					exact
					component={StockReport}
				/>

				<AdminRoute
					path='/admin/gq-reports/operations'
					exact
					component={OperationsReport}
				/>
				<AdminRoute
					path='/admin/update-employee'
					exact
					component={UpdateEmployee}
				/>
				<AdminRoute
					path='/admin/update-employee/:userId'
					exact
					component={UpdateEmployeeSingle}
				/>
				<AdminRoute path='/admin/add-color' exact component={CreateColor} />
				<AdminRoute path='/admin/add-size' exact component={CreateSize} />

				<AdminRoute path='/admin/add-new-store' exact component={AddStore} />
				<AdminRoute path='/admin/order-return' exact component={OrderReturn} />
				<AdminRoute path='/admin/orders-list' exact component={OrdersList} />
				<AdminRoute path='/admin/return-list' exact component={ReturnList} />
				<AdminRoute
					path='/admin/exchange-list'
					exact
					component={ExchangeList}
				/>
				<AdminRoute
					path='/admin/return-details/:orderId'
					exact
					component={ReturnDetails}
				/>
				<AdminRoute
					path='/admin/order-exchange'
					exact
					component={OrderExchange}
				/>
				<AdminRoute
					path='/admin/exchange-or-return'
					exact
					component={ReturnOrExchange}
				/>

				<AdminRoute
					path='/admin/exchange-or-return/offline-store'
					exact
					component={ReturnOrExchangeOfflineStore}
				/>

				<AdminRoute path='/admin/update-store' exact component={UpdateStore} />

				<AdminRoute
					path='/admin/update-store/:storeId'
					exact
					component={UpdateStoreSingle}
				/>

				<AdminRoute path='/admin/delete-store' exact component={DeleteStore} />

				<AdminRoute
					path='/admin/online-store-management'
					exact
					component={OnlineStoreManagement}
				/>

				<AdminRoute path='/admin/add-top-ads' exact component={AddTopAds} />
				<AdminRoute
					path='/admin/update-top-ads'
					exact
					component={UpdateTopAds}
				/>

				<AdminRoute path='/admin/add-hero-comp' exact component={AddHeroComp} />
				<AdminRoute path='/admin/website-edit' exact component={EditWebsite} />
				<AdminRoute
					path='/admin/website-edit/aboutus-edit'
					exact
					component={EditAboutUsPage}
				/>
				<AdminRoute
					path='/admin/website-edit/contactus-edit'
					exact
					component={EditContactUsPage}
				/>
			</Switch>
			<Footer />
		</BrowserRouter>
	);
};

export default App;
