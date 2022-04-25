const User = require('./User');
const Project = require('./Project');
const Comment = require('./comment');

User.hasMany(Project, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Project.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Project.hasMany(Comment, {
  foreignKey: 'project_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

module.exports = { User, Project };