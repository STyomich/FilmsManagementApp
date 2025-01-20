namespace Application.Interfaces
{
    public interface IUserAccessor
    {
        /// <summary>
        /// Function for returning name of user or null via claims.
        /// </summary>
        /// <returns>User name or null.</returns>
        string GetUserName();
        /// <summary>
        /// Function for return ID of user or null via claims.
        /// </summary>
        /// <returns>Guid or null.</returns>
        string GetUserIdentifier();
    }
}