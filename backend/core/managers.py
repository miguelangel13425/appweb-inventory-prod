from rest_framework import serializers

class DateFormatManager(serializers.ModelSerializer):
    def format_date(self, date):
        if date:
            return date.strftime('%Y-%m-%d %H:%M')
        return None

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        for field in self.Meta.read_only_fields:
            if field in representation and isinstance(representation[field], str) and 'T' in representation[field]:
                formatted_date = self.format_date(getattr(instance, field))
                if formatted_date:
                    representation[field] = formatted_date
        return representation