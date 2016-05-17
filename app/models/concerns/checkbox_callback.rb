module CheckboxCallback
  extend ActiveSupport::Concern

  def find_or_create_checkbox(name, user)
    if (Objective.find_by_name(name) && user.id)
      Checkbox.find_or_create_by(user_id: user.id, objective_id: Objective.find_by_name(name).id)
    end
  end

end
