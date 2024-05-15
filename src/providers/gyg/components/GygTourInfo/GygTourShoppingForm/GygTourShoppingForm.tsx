// eslint-disable-next-line import/no-extraneous-dependencies
import Model, { Providers, helper } from '@tripian/model';
import React, { useState } from 'react';
import moment from 'moment';
import { allTimeZone } from './timezones';
import CloseIconButton from '../../../../../components/base/Button/Icons/CloseIconButton/CloseIconButton';
import TextField from '../../../../../components/base/TextField/TextField';
import RSelect from '../../../../../components/base/RSelect/RSelect';
import Button from '../../../../../components/base/Button/Button';
import classes from './GygTourShoppingForm.scss';

interface IGygTourShoppingForm {
  user?: Model.User;
  clicked: (data: Providers.Gyg.TourShoppingFormData) => void;
  goBack: () => void;
  t: (value: Model.TranslationKey) => string;
}

const GygTourShoppingForm: React.FC<IGygTourShoppingForm> = ({ user, clicked, goBack, t }) => {
  const [formData, setFormData] = useState<Providers.Gyg.TourShoppingFormData>({
    user: {
      first_name: user?.firstName || '',
      last_name: user?.lastName || '',
      email: user?.email || '',
      country_code: '',
      phone_number: '',
      address_line_1: '',
      postal_code: '',
      city: '',
    },
    creditCard: { holderName: '', number: '', cvc: '', expiryMonth: '', expiryYear: '', generationtime: moment().format('YYYY-MM-DDTHH:mm:ss') },
  });

  moment.locale(window.twindow.langCode);

  const isButtonDisabled = Object.values(formData.user).some((x) => x === null || x === '') || Object.values(formData.creditCard).some((x) => x === null || x === '');

  return (
    <div className={classes.tourShoppingForm}>
      <div className="row p4">
        <div className="col col12 my2">
          <h3 className="center">{t('trips.myTrips.localExperiences.tourDetails.travelerInformations')}</h3>
        </div>
        <div className={classes.gygTourShoppingFormClose}>
          <CloseIconButton fill="#fff" clicked={goBack} />
        </div>

        <div className="col col6">
          <h4 className="my2">{t('trips.myTrips.localExperiences.tourDetails.firstName')}</h4>
          <TextField
            type="text"
            name="first_name"
            value={formData.user.first_name}
            onChange={(event) => {
              setFormData({ ...formData, user: { ...formData.user, first_name: event.target.value } });
            }}
            autocomplete="on"
          />
        </div>
        <div className="col col6">
          <h4 className="my2">{t('trips.myTrips.localExperiences.tourDetails.lastName')}</h4>
          <TextField
            type="text"
            name="last_name"
            value={formData.user.last_name}
            onChange={(event) => {
              setFormData({ ...formData, user: { ...formData.user, last_name: event.target.value } });
            }}
            autocomplete="on"
          />
        </div>
        <div className="col col4-m col12">
          <h4 className="my2">{t('trips.myTrips.localExperiences.tourDetails.countryCode')}</h4>
          <RSelect
            options={allTimeZone.map((tz) => ({
              value: tz.Code,
              label: `${tz.Name} (${tz.MobileCode})`,
            }))}
            onSelectedOptionChange={(selectedOption) => {
              setFormData({ ...formData, user: { ...formData.user, country_code: selectedOption.value } });
            }}
          />
        </div>
        <div className="col col4-m col12">
          <h4 className="my2">{t('trips.myTrips.localExperiences.tourDetails.phoneNumber')}</h4>
          <TextField
            type="text"
            name="phone_number"
            value={formData.user.phone_number}
            onChange={(event) => {
              setFormData({ ...formData, user: { ...formData.user, phone_number: event.target.value } });
            }}
            autocomplete="on"
          />
        </div>
        <div className="col col4-m col12">
          <h4 className="my2">{t('trips.myTrips.localExperiences.tourDetails.email')}</h4>
          <TextField
            type="email"
            name="email"
            value={formData.user.email}
            onChange={(event) => {
              setFormData({ ...formData, user: { ...formData.user, email: event.target.value } });
            }}
            autocomplete="on"
          />
        </div>
        <div className="col col12">
          <h4 className="my2">{t('trips.myTrips.localExperiences.tourDetails.address')}</h4>
          <TextField
            type="text"
            name="address"
            value={formData.user.address_line_1}
            onChange={(event) => {
              setFormData({ ...formData, user: { ...formData.user, address_line_1: event.target.value } });
            }}
            autocomplete="on"
          />
        </div>
        <div className="col col6">
          <h4 className="my2">{t('trips.myTrips.localExperiences.tourDetails.city')}</h4>
          <TextField
            type="text"
            name="city"
            value={formData.user.city}
            onChange={(event) => {
              setFormData({ ...formData, user: { ...formData.user, city: event.target.value } });
            }}
            autocomplete="on"
          />
        </div>
        <div className="col col6">
          <h4 className="my2">{t('trips.myTrips.localExperiences.tourDetails.postalCode')}</h4>
          <TextField
            type="text"
            name="postal_code"
            value={formData.user.postal_code}
            onChange={(event) => {
              setFormData({ ...formData, user: { ...formData.user, postal_code: event.target.value } });
            }}
            autocomplete="on"
          />
        </div>
        <div className="col col12 my1">
          <h3 className="center">{t('trips.myTrips.localExperiences.tourDetails.billingInformations')}</h3>
        </div>

        <span className={classes.paymentInfo}>{t('trips.myTrips.localExperiences.tourDetails.paymentAreSecureAndEncrypted')}</span>
        <div className="col col12">
          <h4 className="my2">{t('trips.myTrips.localExperiences.tourDetails.holderName')}</h4>
          <TextField
            type="text"
            name="credit_card_fullname"
            value={formData.creditCard.holderName}
            onChange={(event) => {
              setFormData({ ...formData, creditCard: { ...formData.creditCard, holderName: event.target.value } });
            }}
            autocomplete="on"
          />
        </div>
        <div className="col col12">
          <h4 className="my2">{t('trips.myTrips.localExperiences.tourDetails.cardNumber')}</h4>
          <TextField
            type="text"
            name="credit_card_no"
            value={formData.creditCard.number}
            onChange={(event) => {
              setFormData({ ...formData, creditCard: { ...formData.creditCard, number: event.target.value } });
            }}
            autocomplete="on"
          />
        </div>
        <div className="col col4">
          <h4 className="my2">{t('trips.myTrips.localExperiences.tourDetails.expiryMonth')}</h4>
          <TextField
            type="text"
            name="expiryMonth"
            value={formData.creditCard.expiryMonth}
            onChange={(event) => {
              setFormData({ ...formData, creditCard: { ...formData.creditCard, expiryMonth: event.target.value } });
            }}
            autocomplete="on"
          />
        </div>
        <div className="col col4">
          <h4 className="my2">{t('trips.myTrips.localExperiences.tourDetails.expiryYear')}</h4>
          <TextField
            type="text"
            name="expiryYear"
            value={formData.creditCard.expiryYear}
            onChange={(event) => {
              setFormData({ ...formData, creditCard: { ...formData.creditCard, expiryYear: event.target.value } });
            }}
            autocomplete="on"
          />
        </div>
        <div className="col col4">
          <h4 className="my2">Cvc</h4>
          <TextField
            type="text"
            name="credit_card_cvc"
            value={formData.creditCard.cvc}
            onChange={(event) => {
              setFormData({ ...formData, creditCard: { ...formData.creditCard, cvc: event.target.value } });
            }}
            autocomplete="on"
          />
        </div>
        <div className="col col12 center mt5">
          <Button
            className={classes.confirmButton}
            onClick={() => {
              const selectedCountry = allTimeZone.find((atz) => atz.Code === formData.user.country_code);
              const newFormData = helper.deepCopy(formData);
              newFormData.user.phone_number = (selectedCountry?.MobileCode || '') + newFormData.user.phone_number;

              clicked(newFormData);
            }}
            text={t('trips.myTrips.localExperiences.tourDetails.confirmBooking')}
            color="primary"
            disabled={isButtonDisabled}
          />
        </div>
      </div>
    </div>
  );
};

export default GygTourShoppingForm;
