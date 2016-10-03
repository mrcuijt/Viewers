import { OHIF } from 'meteor/ohif:core';

class MeasurementManager {

    /**
     * Returns new measurement number given a timepointId
     * @param timepointId
     * @param isTarget
     * @returns {number} - Number of measurements in timepoint
     */
    static getNewMeasurementNumber(timepointId, Collection, timepointApi) {
        // Get all current lesion measurements
        const numMeasurements = Collection.find().count();

        // If no measurements exist yet, start at 1
        if (!numMeasurements) {
            return 1;
        }

        const timepoint = timepointApi.timepoints.findOne({
            timepointId: timepointId
        });

        const numMeasurementsAtTimepoint = Collection.find({
            studyInstanceUid: {
                $in: timepoint.studyInstanceUids
            }
        }).count();

        return numMeasurementsAtTimepoint + 1;
    }

    /**
     * If the current Measurements Number already exists
     * for any other timepoint, returns lesion locationUID
     * @param measurementData
     * @returns {number} - Measurement location ID
     */
    static getLocationIdIfMeasurementExists(measurementData, Collection) {
        const measurement = Collection.findOne({
            measurementNumber: measurementData.measurementNumber
        });

        if (!measurement) {
            return;
        }

        return measurement.locationId;
    }

}

OHIF.measurements.MeasurementManager = MeasurementManager;