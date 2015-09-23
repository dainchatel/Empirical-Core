namespace :fullnames do
  desc 'generate uids'
  task :generate => :environment do
    generate_fullnames
  end

  def generate_fullnames
    User.find_each do |user|
      new_name = FullnameGenerator.new(user.name).generate
      user.update_attributes name: new_name
    end
  end
end
