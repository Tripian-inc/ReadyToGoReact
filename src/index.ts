import './styles/global.scss';

import Accordion from './components/base/Accordion/Accordion';
import AccommondationCard from './components/AccommondationCard/AccommondationCard';
import AccommondationInfo from './components/AccommondationInfo/AccommondationInfo';

import Badge from './components/base/Badge/Badge';
import BackButton from './components/base/Button/Icons/BackButton/BackButton';
import Backdrop from './components/base/Backdrop/Backdrop';
import BbAccommodationInfo from './providers/bb/components/BbAccommodationInfo/BbAccommodationInfo';
import BbCarRentInfo from './providers/bb/components/BbCarRentInfo/BbCarRentInfo';
import BbTourCard from './providers/bb/components/BbTourCard/BbTourCard';
import BbTourInfo from './providers/bb/components/BbTourInfo/BbTourInfo';
import BbTourInfoForm from './providers/bb/components/BbTourInfo/BbTourInfoForm/BbTourInfoForm';
import BbTourInfoImage from './providers/bb/components/BbTourInfo/BbTourInfoImage/BbTourInfoImage';
import BbTourInfoOffer from './providers/bb/components/BbTourInfo/BbTourInfoOffer/BbTourInfoOffer';
import BbTourInfoText from './providers/bb/components/BbTourInfo/BbTourInfoText/BbTourInfoText';
import Booking from './providers/yelp/components/Booking/Booking';
import BookingCard from './components/BookingCard/BookingCard';
import BookingDetails from './providers/gyg/components/BookingDetails/BookingDetails';
import Button from './components/base/Button/Button';
import ButtonIcons from './components/base/Button/Icons';
import BUTTON_TYPES from './components/base/Button/ButtonTypes';
import ButterflyCard from './components/ButterflyCard/ButterflyCard';
import ButterflyCardSlider from './components/ButterflyCardSlider/ButterflyCardSlider';

import CardSlider from './components/CardSlider/CardSlider';
import Checkbox from './components/base/Checkbox/Checkbox';
// import CityInfo from './components/CityInfo/CityInfo';
import CreateIconButton from './components/base/Button/Icons/CreateIconButton/CreateIconButton';
import CloseIconButton from './components/base/Button/Icons/CloseIconButton/CloseIconButton';
import CloseIconButton2 from './components/base/Button/Icons/CloseIconButton2/CloseIconButton2';
import ConfirmModalPopup from './components/ConfirmModalPopup/ConfirmModalPopup';
import Copy from './components/base/Copy/Copy';
import CouponCard from './components/CouponCard/CouponCard';
import CustomPopover from './components/base/CustomPopover/CustomPopover';
import CustomSlider from './components/CustomSlider/CustomSlider';

import DatePicker from './components/DatePicker/DatePicker';
import DateRangePicker from './components/DateRangePicker/DateRangePicker';
import DeleteUser from './components/DeleteUser/DeleteUser';
import DeleteUserSuccess from './components/DeleteUserSuccess/DeleteUserSuccess';
import DestinationSelect from './components/DestinationSelect/DestinationSelect';
import DirectionInfo from './components/DirectionInfo/DirectionInfo';
import Dropdown from './components/base/Dropdown/Dropdown';

import ErrorMessage from './components/base/ErrorMessage/ErrorMessage';
import EventCard from './components/EventCard/EventCard';
import EventList from './components/EventList/EventList';

import Feedback from './components/FeedBack/FeedBack';
import FlightCard from './components/FlightCard/FlightCard';
import FormTemplateAgent from './components/FormTemplate/FormTemplateAgent/FormTemplateAgent';
import FormTemplateCompanion from './components/FormTemplate/FormTemplateCompanion/FormTemplateCompanion';
import FormTemplateLogin from './components/FormTemplate/FormTemplateLogin/FormTemplateLogin';
import FormTemplateNewPassword from './components/FormTemplate/FormTemplateNewPassword/FormTemplateNewPassword';
import FormTemplateProfile from './components/FormTemplate/FormTemplateProfile/FormTemplateProfile';
import FormTemplateRegister from './components/FormTemplate/FormTemplateRegister/FormTemplateRegister';
import FormTemplateResetPassword from './components/FormTemplate/FormTemplateResetPassword/FormTemplateResetPassword';
import FormTemplateToursAndTickets from './components/FormTemplate/FormTemplateToursAndTickets/FormTemplateToursAndTickets';
import FormTemplateTripNext from './components/FormTemplate/FormTemplateTripNext/FormTemplateTripNext';
import FormTemplateTripNextWidget from './components/FormTemplate/FormTemplateTripNextWidget/FormTemplateTripNextWidget';

import GoogleMaps from './components/GoogleMaps/GoogleMaps';
import GoogleMapsPoiInfo from './components/GoogleMapsPoiInfo/GoogleMapsPoiInfo';
import GoogleMapsProductInfo from './components/GoogleMapsProductInfo/GoogleMapsProductInfo';
import GoogleMapsSearch from './components/GoogleMapsSearch/GoogleMapsSearch';
import GPlacesAutocomplete2 from './components/GoogleMaps/GPlacesAutocomplete2/GPlacesAutocomplete2';
import GygTourCard from './providers/gyg/components/GygTourCard/GygTourCard';
import GygTourInfoEx from './providers/gyg/components/GygTourInfoEx/GygTourInfo';
import GygTourInfoForm from './providers/gyg/components/GygTourInfo/GygTourInfoForm/GygTourInfoForm';
import GygTourInfoImage from './providers/gyg/components/GygTourInfo/GygTourInfoImage/GygTourInfoImage';
import GygTourOption from './providers/gyg/components/GygTourInfo/GygTourOption/GygTourOption';
import GygTourShoppingForm from './providers/gyg/components/GygTourInfo/GygTourShoppingForm/GygTourShoppingForm';

import IconImage from './components/base/IconImage/IconImage';
import Img from './components/base/Img/Img';
import ImgLazy from './components/base/ImgLazy/ImgLazy';
import Input from './components/base/Input/Input';
import ItineraryCardSlider from './components/ItineraryCardSlider/ItineraryCardSlider';

import Label from './components/Label/Label';
import Loading from './components/Loading/Loading';

import MapCategory from './components/MapCategory/MapCategory';
import Modal from './components/base/Modal/Modal';
import ModalFull from './components/base/ModalFull/ModalFull';
import MustTryCard from './components/MustTryCard/MustTryCard';

import NumberCounter from './components/base/NumberCounter/NumberCounter';
import NumberInput from './components/base/NumberInput/NumberInput';
import Notification from './components/base/Notification/Notification';

import OfferAvailableDaySelect from './components/OfferAvailableDaySelect/OfferAvailableDaySelect';
import OfferCard from './components/OfferCard/OfferCard';
import OpenedHours from './components/PoiInfo/PoiInfoText/OpenedHours/OpenedHours';
import OpeningsForm from './providers/yelp/components/OpeningsForm/OpeningsForm';

import PageLoading from './components/base/PageLoading/PageLoading';
import PlaceDetailsModal from './components/PlaceDetailsModal/PlaceDetailsModal';
import PlanChangeDay from './components/PlanChangeDay/PlanChangeDay';
import PoiCategories from './components/PoiCategories/PoiCategories';
import PoiInfo from './components/PoiInfo/PoiInfo';
import PoiInfoImage from './components/PoiInfo/PoiInfoImage/PoiInfoImage';
import PoiInfoText from './components/PoiInfo/PoiInfoText/PoiInfoText';
import PoiListCard from './components/PoiListCard/PoiListCard';
import PoiListSearch from './components/PoiListSearch/PoiListSearch';
import PoiRefCard from './components/PoiRefCard/PoiRefCard';
import PoiSearchAutoComplete from './components/PoiSearchAutoComplete/PoiSearchAutoComplete';
import PoiOfferRefCard from './components/PoiOfferRefCard/PoiOfferRefCard';
import PreAppLoading from './components/base/PreAppLoading/PreAppLoading';
import PreLoading from './components/base/PreLoading/PreLoading';
import Price from './components/Price/Price';
import ProgressLoading from './components/base/ProgressLoading/ProgressLoading';
import ProgressAppLoading from './components/base/ProgressAppLoading/ProgressAppLoading';

import RadioButton from './components/base/RadioButtonGroup/RadioButton/RadioButton';
import RadioButtonGroup from './components/base/RadioButtonGroup/RadioButtonGroup';
import RatingStars from './components/RatingStars/RatingStars';
import ReadMoreLess from './components/base/ReadMoreLess/ReadMoreLess';
import RefCard from './components/RefCard/RefCard';
import * as RouteResult from './components/GoogleMaps/GRoute/IRouteResult';
import RSelect from './components/base/RSelect/RSelect';
import ReservationDetails from './providers/yelp/components/ReservationDetails/ReservationDetails';
import ResetPasswordApproved from './components/ResetPasswordApproved/ResetPasswordApproved';
import ResetPasswordEmail from './components/ResetPasswordEmail/ResetPasswordEmail';
import RezdyProductCard from './providers/rezdy/RezdyProductCard/RezdyProductCard';
import RezdyTourInfo from './providers/rezdy/RezdyTourInfo/RezdyTourInfo';
import RezdyTourInfoImage from './providers/rezdy/RezdyProductInfo/RezdyTourInfoImage/RezdyTourInfoImage';

// import Stories from './components/Stories/Stories';

import SearchThisArea from './components/SearchThisArea/SearchThisArea';
import ShowMoreLess from './components/base/ShowMoreLess/ShowMoreLess';
import SideNavigation from './components/base/SideNavigation/SideNavigation';
import SocialLogin from './components/SocialLogin/SocialLogin';
import StepAlternativeCard from './components/StepAlternativeCard/StepAlternativeCard';
import StepCard from './components/StepCard/StepCard';
import StepCardUserReaction from './components/StepCardUserReaction/StepCardUserReaction';
import StepInfo from './components/StepInfo/StepInfo';
import StepTimeframe from './components/StepTimeframe/StepTimeframe';
import Svg from './components/base/Svg/Svg';
import Switch from './components/base/Switch/Switch';
import * as SvgIcons from './components/base/Svg/Icons';

import QuestionTemplate from './components/QuestionTemplate/QuestionTemplate';

import TabMenu from './components/base/TabMenu/TabMenu';
import TasteCard from './components/TasteCard/TasteCard';
import TasteCard2 from './components/TasteCard2/TasteCard2';
import TasteInfo from './components/TasteInfo/TasteInfo';
import TextField from './components/base/TextField/TextField';
import Toggle from './components/base/Toggle/Toggle';
import ToggleSwitch from './components/base/ToggleSwitch/ToggleSwitch';
import ToristyProductCard from './providers/toristy/ToristyProductCard/ToristyProductCard';
import ToristyTourInfoImage from './providers/toristy/ToristyTourInfo/ToristyTourInfoImage/ToristyTourInfoImage';
import ToristyTourInfoText from './providers/toristy/ToristyTourInfo/ToristyTourInfoText/ToristyTourInfoText';
import TourRefCardProduct from './components/TourRefCardProduct/TourRefCardProduct';
import TripCard from './components/TripCard/TripCard';
import TripSavedCard from './components/TripSavedCard/TripSavedCard';

import UserCompanions from './components/UserCompanions/UserCompanions';
import UserFeedbacks from './components/FeedBack/UserFeedbacks/UserFeedbacks';

import ViatorProductCard from './providers/viator/components/ViatorProductCard/ViatorProductCard';
import ViatorProductInfo from './providers/viator/components/ViatorProductInfo/ViatorProductInfo';
import ViatorTourInfoImage from './providers/viator/components/ViatorProductInfo/ViatorTourInfoImage/ViatorTourInfoImage';
import VictoryProductCard from './providers/victory/VictoryProductCard/VictoryProductCard';

export {
  Accordion,
  AccommondationCard,
  AccommondationInfo,
  Badge,
  BackButton,
  Backdrop,
  BbAccommodationInfo,
  BbCarRentInfo,
  BbTourCard,
  BbTourInfo,
  BbTourInfoForm,
  BbTourInfoImage,
  BbTourInfoOffer,
  BbTourInfoText,
  Booking,
  BookingCard,
  BookingDetails,
  Button,
  ButtonIcons,
  BUTTON_TYPES,
  ButterflyCard,
  ButterflyCardSlider,
  CardSlider,
  Checkbox,
  /* CityInfo, */
  CreateIconButton,
  CloseIconButton,
  CloseIconButton2,
  ConfirmModalPopup,
  Copy,
  CouponCard,
  CustomPopover,
  CustomSlider,
  DatePicker,
  DateRangePicker,
  DeleteUser,
  DeleteUserSuccess,
  DestinationSelect,
  DirectionInfo,
  Dropdown,
  ErrorMessage,
  EventCard,
  EventList,
  Feedback,
  FlightCard,
  FormTemplateAgent,
  FormTemplateCompanion,
  FormTemplateLogin,
  FormTemplateNewPassword,
  FormTemplateProfile,
  FormTemplateRegister,
  FormTemplateResetPassword,
  FormTemplateToursAndTickets,
  FormTemplateTripNext,
  FormTemplateTripNextWidget,
  GoogleMaps,
  GoogleMapsPoiInfo,
  GoogleMapsProductInfo,
  GoogleMapsSearch,
  GPlacesAutocomplete2,
  GygTourCard,
  GygTourInfoEx,
  GygTourInfoForm,
  GygTourInfoImage,
  GygTourShoppingForm,
  GygTourOption,
  IconImage,
  Img,
  ImgLazy,
  Input,
  ItineraryCardSlider,
  Label,
  Loading,
  MapCategory,
  Modal,
  ModalFull,
  MustTryCard,
  NumberCounter,
  NumberInput,
  Notification,
  OfferAvailableDaySelect,
  OfferCard,
  OpenedHours,
  OpeningsForm,
  PageLoading,
  PlaceDetailsModal,
  PlanChangeDay,
  PoiCategories,
  PoiInfo,
  PoiInfoImage,
  PoiInfoText,
  PoiListCard,
  PoiListSearch,
  PoiRefCard,
  PoiSearchAutoComplete,
  PoiOfferRefCard,
  PreAppLoading,
  PreLoading,
  Price,
  ProgressLoading,
  ProgressAppLoading,
  RadioButton,
  RadioButtonGroup,
  RatingStars,
  ReadMoreLess,
  RefCard,
  ReservationDetails,
  ResetPasswordApproved,
  ResetPasswordEmail,
  RezdyProductCard,
  RezdyTourInfo,
  RezdyTourInfoImage,
  RouteResult,
  RSelect,
  // Stories,
  SearchThisArea,
  ShowMoreLess,
  SideNavigation,
  SocialLogin,
  StepAlternativeCard,
  StepCard,
  StepCardUserReaction,
  StepInfo,
  StepTimeframe,
  Svg,
  Switch,
  SvgIcons,
  QuestionTemplate,
  TabMenu,
  TasteCard,
  TasteCard2,
  TasteInfo,
  TextField,
  Toggle,
  ToggleSwitch,
  ToristyProductCard,
  ToristyTourInfoImage,
  ToristyTourInfoText,
  TourRefCardProduct,
  TripCard,
  TripSavedCard,
  UserCompanions,
  UserFeedbacks,
  ViatorProductCard,
  ViatorProductInfo,
  ViatorTourInfoImage,
  VictoryProductCard,
};
