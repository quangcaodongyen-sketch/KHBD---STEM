export interface StemObjective {
  knowledge: string[];
  generalCompetencies: {
    autonomyAndSelfLearning: string;
    communicationAndCollaboration: string;
    problemSolvingAndCreativity: string;
  };
  stemCompetencies: {
    math: string;
    science: string;
    technology: string;
    engineering: string;
    art?: string;
  };
  digitalCompetence: string;
  qualities: {
    patriotism?: string;
    kindness?: string;
    diligence: string;
    honesty: string;
    responsibility: string;
  };
}

export interface EquipmentMaterialItem {
  name: string;
  specification: string;
  quantity: string;
  note?: string;
  isRecyclable?: boolean;
}

export interface EquipmentSection {
  teacherEquipment: string[];
  studentMaterials: EquipmentMaterialItem[];
  digitalTools?: string[];
  safetyNotes?: string[];
}

export interface TeachingStep {
  stepNumber: number;
  stepName: string;
  timeEstimate?: string;
  target: string;
  content: string;
  expectedProduct: string;
  implementation: {
    teacherActivities: string[];
    studentActivities: string[];
    transferMethod?: string;
  };
}

export interface EvaluationCriterionLevel {
  level1: string; // Mức chưa đạt / Cần cố gắng
  level2: string; // Mức Đạt / Trung bình
  level3: string; // Mức Tốt / Xuất sắc
  maxScore?: number;
}

export interface EvaluationCriterion {
  id: string;
  category: 'product' | 'process' | 'knowledge';
  name: string;
  weightPercent?: number;
  levels: EvaluationCriterionLevel;
}

export interface StemLessonPlan {
  id: string;
  topicName: string;
  gradeLevel: string; // e.g. "Lớp 8"
  schoolLevel: 'primary' | 'lowerSecondary' | 'upperSecondary';
  mainSubject: string;
  integratedSubjects: string[];
  durationPeriods: number; // e.g. 2, 3, 4
  durationText: string; // e.g. "3 tiết (135 phút)"
  overviewDescription: string;
  objectives: StemObjective;
  equipment: EquipmentSection;
  teachingSteps: TeachingStep[];
  evaluationCriteria: {
    productCriteria: EvaluationCriterion[];
    processCriteria: EvaluationCriterion[];
    knowledgeCriteria: EvaluationCriterion[];
  };
  worksheets?: {
    title: string;
    description: string;
    tasks: string[];
    questions: string[];
  }[];
  createdAt: string;
  updatedAt: string;
  rawText?: string;
}

export interface GeneratePromptInput {
  topicName: string;
  gradeLevel: string;
  mainSubject: string;
  integratedSubjects: string[];
  durationPeriods: number;
  targetMaterialsType: 'recycled_lowcost' | 'standard_lab' | 'sensor_iot_tech' | 'custom';
  customRequirements?: string;
  digitalFocus?: string;
}
