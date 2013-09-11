if current_user
  collection current_user.projects
  attributes :id, :name, :description

  child(:users) do
    attributes :id, :username, :display_name
  end

  child(:task_lists) do
    attributes :id, :title, :project_id, :position

    child(:tasks) do
      attributes :id, :finished, :name, :task_list_id, :description, :assignee_id, :due_date

      child(:comments) do
        attributes :id, :body, :task_id

        child(:author) do
          attributes :username
        end
      end
    end
  end
end