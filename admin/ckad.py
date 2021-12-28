from tools.getuser import get_user_by_i

def ckadmin(token):
    """
    检查是否为管理员
    """
    udog = get_user_by_i(token)
    if udog=="ERROR" or udog is None:
        return False
    return udog.isAdmin
