from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class BlogPaginator(PageNumberPagination):
    page_size = 4
    max_page_size = 10
    page_query_param = 'page'

    def get_paginated_response(self, data):
        return Response(
            {
                "links": {
                    "next": self.get_next_link(),
                    "previous": self.get_previous_link(),
                },
                "page_size": self.page_size,
                "total_blogs": self.page.paginator.count,
                "total_pages": self.page.paginator.num_pages,
                "results": data
            }
        )
