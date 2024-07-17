import { createState, Value } from "terraconnect-state";
import { Clinic } from "./types";

export const clinics = createState<Array<Clinic>>(JSON.parse(localStorage.getItem('clinics') ?? '[]'));
fetch(`https://api.${window.location.host.split('.')[0]}.terraconnect.de/clinics`).then(data => data.json()).then(async (data) => {
  localStorage.setItem('clinics', JSON.stringify(data));
  clinics[Value] = data;
});

export function getClinic(id: number) {
  let clinic = createState<Clinic>(JSON.parse(localStorage.getItem(`clinic/${id}`) ?? 'null') || { id });
  fetch(`https://api.${window.location.host.split('.')[0]}.terraconnect.de/clinic/${id}`).then(data => data.json()).then((data) => {
    localStorage.setItem(`clinic/${id}`, JSON.stringify(data));
    clinic[Value] = data;
  });
  return clinic;
}