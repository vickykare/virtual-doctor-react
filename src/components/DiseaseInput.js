import React, { useState } from "react";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import PredictDisease from "./PredictDisease";
import axios from "axios";
import Disease from "./diseases/Disease";

function DiseaseInput() {
  const [state, setState] = useState({
    values: [],
    disease: null,
  });
  const [responseError, setResponseError] = useState("");
  const animatedComponents = makeAnimated();
  let handleChange = (e) => {
    let values = [];
    for (let i = 0; i < e.length; i++) {
      values.push(e[i].value);
    }
    setState({
      ...state,
      values: values,
    });
  };
  let handlesubmit = (e) => {
    e.preventDefault();
    if (state.values.length < 4) {
      return;
    }
    let data = { data: state.values };
    setResponseError("");
    axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/predict/",
      data,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        if (response.status === 200) {
          // console.log(response.data);
          setState({
            values: state.values,
            disease: response.data.disease,
            message: response.data.message,
          });
        }
      })
      .catch(function (error) {
        if (error.response) {
          setResponseError(error.response.data.detail);
        } else {
          setResponseError("Something went wrong! Please try again.");
        }
      });
  };
  const options = [
    { value: "abdominal_pain", label: "abdominal pain" },
    { value: "abnormal_menstruation", label: "abnormal menstruation" },
    { value: "acidity", label: "acidity" },
    { value: "acute_liver_failure", label: "acute liver failure" },
    { value: "altered_sensorium", label: "altered sensorium" },
    { value: "anxiety", label: "anxiety" },
    { value: "back_pain", label: "back pain" },
    { value: "belly_pain", label: "belly pain" },
    { value: "blackheads", label: "blackheads" },
    { value: "bladder_discomfort", label: "bladder discomfort" },
    { value: "blister", label: "blister" },
    { value: "blood_in_sputum", label: "blood in sputum" },
    { value: "bloody_stool", label: "bloody stool" },
    {
      value: "blurred_and_distorted_vision",
      label: "blurred and distorted vision",
    },
    { value: "breathlessness", label: "breathlessness" },
    { value: "brittle_nails", label: "brittle nails" },
    { value: "bruising", label: "bruising" },
    { value: "burning_micturition", label: "burning micturition" },
    { value: "chest_pain", label: "chest pain" },
    { value: "chills", label: "chills" },
    { value: "cold_hands_and_feets", label: "cold hands and feets" },
    { value: "coma", label: "coma" },
    { value: "congestion", label: "congestion" },
    { value: "constipation", label: "constipation" },
    { value: "continuous_feel_of_urine", label: "continuous feel of urine" },
    { value: "continuous_sneezing", label: "continuous sneezing" },
    { value: "cough", label: "cough" },
    { value: "cramps", label: "cramps" },
    { value: "dark_urine", label: "dark urine" },
    { value: "dehydration", label: "dehydration" },
    { value: "depression", label: "depression" },
    { value: "diarrhoea", label: "diarrhoea" },
    { value: "dischromic _patches", label: "dischromic  patches" },
    { value: "distention_of_abdomen", label: "distention of abdomen" },
    { value: "dizziness", label: "dizziness" },
    { value: "drying_and_tingling_lips", label: "drying and tingling lips" },
    { value: "enlarged_thyroid", label: "enlarged thyroid" },
    { value: "excessive_hunger", label: "excessive hunger" },
    { value: "extra_marital_contacts", label: "extra marital contacts" },
    { value: "family_history", label: "family history" },
    { value: "fast_heart_rate", label: "fast heart rate" },
    { value: "fatigue", label: "fatigue" },
    { value: "fluid_overload", label: "fluid overload" },
    { value: "fluid_overload", label: "fluid overload" },
    { value: "foul_smell_of urine", label: "foul smell of urine" },
    { value: "headache", label: "headache" },
    { value: "high_fever", label: "high fever" },
    { value: "hip_joint_pain", label: "hip joint pain" },
    {
      value: "history_of_alcohol_consumption",
      label: "history of alcohol consumption",
    },
    { value: "increased_appetite", label: "increased appetite" },
    { value: "indigestion", label: "indigestion" },
    { value: "inflammatory_nails", label: "inflammatory nails" },
    { value: "internal_itching", label: "internal itching" },
    { value: "irregular_sugar_level", label: "irregular sugar level" },
    { value: "irritability", label: "irritability" },
    { value: "irritation_in_anus", label: "irritation in anus" },
    { value: "itching", label: "itching" },
    { value: "joint_pain", label: "joint pain" },
    { value: "knee_pain", label: "knee pain" },
    { value: "lack_of_concentration", label: "lack of concentration" },
    { value: "lethargy", label: "lethargy" },
    { value: "loss_of_appetite", label: "loss of appetite" },
    { value: "loss_of_balance", label: "loss of balance" },
    { value: "loss_of_smell", label: "loss of smell" },
    { value: "malaise", label: "malaise" },
    { value: "mild_fever", label: "mild fever" },
    { value: "mood_swings", label: "mood swings" },
    { value: "movement_stiffness", label: "movement stiffness" },
    { value: "mucoid_sputum", label: "mucoid sputum" },
    { value: "muscle_pain", label: "muscle pain" },
    { value: "muscle_wasting", label: "muscle wasting" },
    { value: "muscle_weakness", label: "muscle weakness" },
    { value: "nausea", label: "nausea" },
    { value: "neck_pain", label: "neck pain" },
    { value: "nodal_skin_eruptions", label: "nodal skin eruptions" },
    { value: "obesity", label: "obesity" },
    { value: "pain_behind_the_eyes", label: "pain behind the eyes" },
    {
      value: "pain_during_bowel_movements",
      label: "pain during bowel movements",
    },
    { value: "pain_in_anal_region", label: "pain in anal region" },
    { value: "painful_walking", label: "painful walking" },
    { value: "palpitations", label: "palpitations" },
    { value: "passage_of_gases", label: "passage of gases" },
    { value: "patches_in_throat", label: "patches in throat" },
    { value: "phlegm", label: "phlegm" },
    { value: "polyuria", label: "polyuria" },
    { value: "prominent_veins_on_calf", label: "prominent veins on calf" },
    { value: "puffy_face_and_eyes", label: "puffy face and eyes" },
    { value: "pus_filled_pimples", label: "pus filled pimples" },
    {
      value: "receiving_blood_transfusion",
      label: "receiving blood transfusion",
    },
    {
      value: "receiving_unsterile_injections",
      label: "receiving unsterile injections",
    },
    { value: "red_sore_around_nose", label: "red sore around nose" },
    { value: "red_spots_over_body", label: "red spots over body" },
    { value: "redness_of_eyes", label: "redness of eyes" },
    { value: "restlessness", label: "restlessness" },
    { value: "runny_nose", label: "runny nose" },
    { value: "rusty_sputum", label: "rusty sputum" },
    { value: "scurring", label: "scurring" },
    { value: "shivering", label: "shivering" },
    { value: "silver_like_dusting", label: "silver like dusting" },
    { value: "sinus_pressure", label: "sinus pressure" },
    { value: "skin_peeling", label: "skin peeling" },
    { value: "skin_rash", label: "skin rash" },
    { value: "slurred_speech", label: "slurred speech" },
    { value: "small_dents_in_nails", label: "small dents in nails" },
    { value: "spinning_movements", label: "spinning movements" },
    { value: "spotting_ urination", label: "spotting  urination" },
    { value: "stiff_neck", label: "stiff neck" },
    { value: "stomach_bleeding", label: "stomach bleeding" },
    { value: "stomach_pain", label: "stomach pain" },
    { value: "sunken_eyes", label: "sunken eyes" },
    { value: "sweating", label: "sweating" },
    { value: "swelled_lymph_nodes", label: "swelled lymph nodes" },
    { value: "swelling_joints", label: "swelling joints" },
    { value: "swelling_of_stomach", label: "swelling of stomach" },
    { value: "swollen_blood_vessels", label: "swollen blood vessels" },
    { value: "swollen_extremeties", label: "swollen extremeties" },
    { value: "swollen_legs", label: "swollen legs" },
    { value: "throat_irritation", label: "throat irritation" },
    { value: "toxic_look_(typhos)", label: "toxic look (typhos)" },
    { value: "ulcers_on_tongue", label: "ulcers on tongue" },
    { value: "unsteadiness", label: "unsteadiness" },
    { value: "visual_disturbances", label: "visual disturbances" },
    { value: "vomiting", label: "vomiting" },
    { value: "watering_from_eyes", label: "watering from eyes" },
    { value: "weakness_in_limbs", label: "weakness in limbs" },
    { value: "weakness_of_one_body_side", label: "weakness of one body side" },
    { value: "weight_gain", label: "weight gain" },
    { value: "weight_loss", label: "weight loss" },
    { value: "yellow_crust_ooze", label: "yellow crust ooze" },
    { value: "yellow_urine", label: "yellow urine" },
    { value: "yellowing_of_eyes", label: "yellowing of eyes" },
    { value: "yellowish_skin", label: "yellowish skin" },
  ];
  return (
    <>
      <Container>
        <Form onSubmit={handlesubmit}>
          <Row className="d-flex justify-content-center py-5">
            <Col md={6}>
              <h3 className="py-3">Select Symptoms</h3>
              <Select
                components={animatedComponents}
                isMulti
                name="diseases"
                options={options}
                classNamePrefix="select"
                onChange={handleChange}
              />
              {state.values.length > 3 ? null : (
                <p className="text-warning">*Select atleast 4 symptoms</p>
              )}
              {responseError ? (
                <p className="text-center text-danger">{responseError}</p>
              ) : (
                <PredictDisease
                  disease={state.disease}
                  message={state.message}
                />
              )}
              <Button className="my-3" type="submit">
                Predict Disease
              </Button>
            </Col>
          </Row>
        </Form>
        <hr />
        <Disease />
      </Container>
    </>
  );
}

export default DiseaseInput;
