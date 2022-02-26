from rest_framework import permissions

class IsOwner(permissions.BasePermission):
    # For collections
    def has_object_permission(self, request, view, obj):
        if obj.privacyLevel == "Private" or "Personal":
            return obj.user == request.user
