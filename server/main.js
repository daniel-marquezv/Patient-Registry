import { Meteor } from 'meteor/meteor';
import { PatientRegistryCollection } from '/imports/api/PatientRegistryCollection';

const insertPatientRegistry = patientregistry => PatientRegistryCollection.insert({ text: patientregistry });

Meteor.startup(() => {
  
});
