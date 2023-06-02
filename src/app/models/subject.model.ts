export interface SubjectModel {
  subject_id: number;
  subject_name: string;
  // Otras propiedades del modelo
}

export interface CreateSubjectModel extends Omit<SubjectModel, 'subject_id'> {}

export interface UpdateSubjectModel extends Partial<SubjectModel> {}
