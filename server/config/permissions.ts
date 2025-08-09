export const RolePermissions: Record<string, string[]> = {
  admin: ['*'],
  doctor: ['view_all_patients', 'prescribe_medications', 'review_labs', 'telehealth_consults', 'approve_treatments'],
  pharmacist: ['dispense_medications', 'review_prescriptions', 'drug_interactions', 'inventory_management', 'patient_counseling'],
  patient: ['view_own_records', 'book_appointments', 'order_medications', 'view_lab_results'],
};


