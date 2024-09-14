from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _
from .models import UserModel, ProfileModel, RoleModel

class RoleAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    search_fields = ('name', 'description')
    ordering = ('name',)

admin.site.register(RoleModel, RoleAdmin)

class UserAdmin(BaseUserAdmin):
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal info'), {'fields': ('first_name', 'last_name')}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser',
                                       'groups', 'user_permissions')}),
        (_('Important dates'), {'fields': ('last_login',)})
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'first_name', 'last_name', 'password1', 'password2'),
        }),
    )
    list_display = ('email', 'first_name', 'last_name', 'is_staff')
    list_filter = ('is_staff', 'is_superuser', 'is_active', 'groups')
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('email',)
    filter_horizontal = ('groups', 'user_permissions')

    def get_readonly_fields(self, request, obj=None):
        if obj:
            return self.readonly_fields + ('email',)
        return self.readonly_fields

admin.site.register(UserModel, UserAdmin)

class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user_email', 'user_full_name', 'birthdate', 'bio')
    search_fields = ('user__email', 'user__first_name', 'user__last_name', 'bio')
    raw_id_fields = ('user',)
    autocomplete_fields = ('user',)
    date_hierarchy = 'birthdate'
    ordering = ('user__email',)

    fieldsets = (
        (None, {
            'fields': ('user',)
        }),
        ('Personal Info', {
            'fields': ('birthdate', 'bio')
        }),
    )

    def user_email(self, obj):
        return obj.user.email
    user_email.short_description = 'User Email'

    def user_full_name(self, obj):
        return obj.user.get_full_name()
    user_full_name.short_description = 'User Full Name'

    def get_age(self, obj):
        return obj.get_age()
    get_age.short_description = 'Age'

admin.site.register(ProfileModel, ProfileAdmin)