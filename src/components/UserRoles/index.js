const userRoles = {
  admin: 'ROLE_ADMIN',
  moderator: 'ROLE_MODERATOR',
  checkMatchesByRoleAndUserId(userByRole, comment) {
    return (
      (userByRole.id === comment.author.id && comment.updatable === true) ||
      userByRole.role === this.admin ||
      userByRole.role === this.moderator
    );
  },
};

export default userRoles;
