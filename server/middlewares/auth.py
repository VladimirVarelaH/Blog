import jwt

def verifyToken(token):
    """
    Atributes:
        token: encoded JWT
    Returns:
        Object with a JSON with status code
    """
    try:
        decodes_jst = jwt.decode(token, "secret", algorithms=["HS256"])
        response = decodes_jst
        response['status'] = 'success'
        return(response)
    except:
        return({'status':'err'})

def verifyPermissions(token, permission):
    """
        Atributes:
            token: decoded JWT.
            permission: name ok the permission to validate
        Returns:
            A Boolean value
    """
    try:
        token['permissions'].index(permission)
        return True
    except:
        return False
