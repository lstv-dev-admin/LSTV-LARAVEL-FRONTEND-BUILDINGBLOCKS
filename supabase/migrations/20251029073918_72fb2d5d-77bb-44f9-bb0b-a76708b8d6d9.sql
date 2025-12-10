-- Create employee-related tables

-- Payroll Group
CREATE TABLE public.payroll_group (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.payroll_group ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage payroll_group"
ON public.payroll_group FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can view payroll_group"
ON public.payroll_group FOR SELECT
USING (true);

-- Department
CREATE TABLE public.department (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.department ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage department"
ON public.department FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can view department"
ON public.department FOR SELECT
USING (true);

-- Leaves
CREATE TABLE public.leaves (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.leaves ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage leaves"
ON public.leaves FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can view leaves"
ON public.leaves FOR SELECT
USING (true);

-- Sub Department
CREATE TABLE public.sub_department (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.sub_department ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage sub_department"
ON public.sub_department FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can view sub_department"
ON public.sub_department FOR SELECT
USING (true);

-- Division
CREATE TABLE public.division (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.division ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage division"
ON public.division FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can view division"
ON public.division FOR SELECT
USING (true);

-- Branch
CREATE TABLE public.branch (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.branch ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage branch"
ON public.branch FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can view branch"
ON public.branch FOR SELECT
USING (true);

-- Position
CREATE TABLE public.position (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.position ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage position"
ON public.position FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can view position"
ON public.position FOR SELECT
USING (true);

-- Employment Status
CREATE TABLE public.employment_status (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.employment_status ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage employment_status"
ON public.employment_status FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can view employment_status"
ON public.employment_status FOR SELECT
USING (true);

-- Job Rank Level
CREATE TABLE public.job_rank_level (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.job_rank_level ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage job_rank_level"
ON public.job_rank_level FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can view job_rank_level"
ON public.job_rank_level FOR SELECT
USING (true);

-- Proficiency Level
CREATE TABLE public.proficiency_level (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.proficiency_level ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage proficiency_level"
ON public.proficiency_level FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can view proficiency_level"
ON public.proficiency_level FOR SELECT
USING (true);

-- Separation Reason
CREATE TABLE public.separation_reason (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.separation_reason ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage separation_reason"
ON public.separation_reason FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can view separation_reason"
ON public.separation_reason FOR SELECT
USING (true);

-- Incident Types
CREATE TABLE public.incident_types (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.incident_types ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage incident_types"
ON public.incident_types FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can view incident_types"
ON public.incident_types FOR SELECT
USING (true);

-- Experience Level
CREATE TABLE public.experience_level (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.experience_level ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage experience_level"
ON public.experience_level FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can view experience_level"
ON public.experience_level FOR SELECT
USING (true);

-- Civil Service Eligibility
CREATE TABLE public.civil_service_eligibility (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.civil_service_eligibility ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage civil_service_eligibility"
ON public.civil_service_eligibility FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can view civil_service_eligibility"
ON public.civil_service_eligibility FOR SELECT
USING (true);

-- Cost Center
CREATE TABLE public.cost_center (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.cost_center ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage cost_center"
ON public.cost_center FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can view cost_center"
ON public.cost_center FOR SELECT
USING (true);

-- Cost Center Group
CREATE TABLE public.cost_center_group (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.cost_center_group ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage cost_center_group"
ON public.cost_center_group FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can view cost_center_group"
ON public.cost_center_group FOR SELECT
USING (true);

-- Employee Status
CREATE TABLE public.employee_status (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.employee_status ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage employee_status"
ON public.employee_status FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can view employee_status"
ON public.employee_status FOR SELECT
USING (true);

-- Non Payroll Benefit
CREATE TABLE public.non_payroll_benefit (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.non_payroll_benefit ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage non_payroll_benefit"
ON public.non_payroll_benefit FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can view non_payroll_benefit"
ON public.non_payroll_benefit FOR SELECT
USING (true);

-- Medical Exam Types
CREATE TABLE public.medical_exam_types (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.medical_exam_types ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage medical_exam_types"
ON public.medical_exam_types FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can view medical_exam_types"
ON public.medical_exam_types FOR SELECT
USING (true);

-- Medical Condition Types
CREATE TABLE public.medical_condition_types (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.medical_condition_types ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage medical_condition_types"
ON public.medical_condition_types FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can view medical_condition_types"
ON public.medical_condition_types FOR SELECT
USING (true);

-- Add update triggers for all tables
CREATE TRIGGER update_payroll_group_updated_at BEFORE UPDATE ON public.payroll_group FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_department_updated_at BEFORE UPDATE ON public.department FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_leaves_updated_at BEFORE UPDATE ON public.leaves FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_sub_department_updated_at BEFORE UPDATE ON public.sub_department FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_division_updated_at BEFORE UPDATE ON public.division FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_branch_updated_at BEFORE UPDATE ON public.branch FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_position_updated_at BEFORE UPDATE ON public.position FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_employment_status_updated_at BEFORE UPDATE ON public.employment_status FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_job_rank_level_updated_at BEFORE UPDATE ON public.job_rank_level FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_proficiency_level_updated_at BEFORE UPDATE ON public.proficiency_level FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_separation_reason_updated_at BEFORE UPDATE ON public.separation_reason FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_incident_types_updated_at BEFORE UPDATE ON public.incident_types FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_experience_level_updated_at BEFORE UPDATE ON public.experience_level FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_civil_service_eligibility_updated_at BEFORE UPDATE ON public.civil_service_eligibility FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_cost_center_updated_at BEFORE UPDATE ON public.cost_center FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_cost_center_group_updated_at BEFORE UPDATE ON public.cost_center_group FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_employee_status_updated_at BEFORE UPDATE ON public.employee_status FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_non_payroll_benefit_updated_at BEFORE UPDATE ON public.non_payroll_benefit FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_medical_exam_types_updated_at BEFORE UPDATE ON public.medical_exam_types FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_medical_condition_types_updated_at BEFORE UPDATE ON public.medical_condition_types FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
