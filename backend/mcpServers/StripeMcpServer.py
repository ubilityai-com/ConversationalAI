from mcp.server.fastmcp import FastMCP
from typing import Optional
from pydantic import BaseModel, Field
import os, sys

apps = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(apps)

from mcpLibraries import stripe_software

mcp = FastMCP("StripeMcpServer")

class ShippingPaymentintent(BaseModel):
    name: Optional[str] = Field(None,description="Recipient name.")
    phone: Optional[str] = Field(None,description="Recipient phone (including extension).")
    tracking_number: Optional[str] = Field(None,description="The tracking number for a physical product, obtained from the delivery service. If multiple tracking numbers were generated for this purchase, please separate them with commas.")
    line1: Optional[str] = Field(None,description="Address line 1 (e.g., street, PO Box, or company name).")
    city: Optional[str] = Field(None,description="City, district, suburb, town, or village.")
    state: Optional[str] = Field(None,description="State, county, province, or region.")
    postal_code: Optional[str] = Field(None,description="ZIP or postal code.")
    country: Optional[str] = Field(None,description="Two-letter country code (ISO 3166-1 alpha-2).")

class AutomaticPaymentMethods(BaseModel):
    enabled: Optional[bool] = Field(None,description="Whether this feature is enabled.")

class CreateStripePaymentintentInput(BaseModel):
    amount: int = Field(description="Amount intended to be collected by this PaymentIntent")
    currency: str = Field(description="Three-letter ISO currency code, in lowercase")
    automatic_payment_methods: Optional[AutomaticPaymentMethods] =Field(None,description="When you enable this parameter, this PaymentIntent accepts payment methods that you enable in the Dashboard and that are compatible with this PaymentIntent’s other parameters.")
    shipping: Optional[ShippingPaymentintent] = Field(None,description="Shipping information for the customer")
    description: Optional[str] = Field(None,description="An arbitrary string attached to the object. Useful for displaying to users.")
    confirm: Optional[bool] = Field(None,description="Set to true to attempt to confirm this PaymentIntent immediately")
    receipt_email: Optional[str] = Field(None, description="Email address to send the receipt to")
    customer: Optional[str] = Field(None,description="ID of the Customer this PaymentIntent belongs to, if one exists")


class UpdateStripePaymentintentInput(BaseModel):
    payment_id: str = Field(description="The id of the payment to be modified")
    amount: Optional[int] = Field(None, description="Amount intended to be collected by this PaymentIntent")
    currency: Optional[str] = Field(None, description="Three-letter ISO currency code, in lowercase")
    shipping: Optional[ShippingPaymentintent] = Field(None, description="Shipping information for the customer")
    description: Optional[str] = Field(None, description="An arbitrary string attached to the object. Useful for displaying to users.")
    confirm: Optional[bool] = Field(None,description="Set to true to attempt to confirm this PaymentIntent immediately")
    receipt_email: Optional[str] = Field(None, description="Email address to send the receipt to")
    customer: Optional[str] = Field(None,description="ID of the Customer this PaymentIntent belongs to, if one exists")


class GetStripePaymentintentInput(BaseModel):
    payment_id: str = Field(description="The id of the payment to be retrieved")

class CancelStripePaymentintentInput(BaseModel):
    payment_id: str = Field(description="The id of the payment to be deleted")


class GetManyStripePaymentintentInput(BaseModel):
    customer: Optional[str] = Field(
        None,
        description="Only return PaymentIntents for the customer that this customer ID specifies",
    )
    ending_before: Optional[str] = Field(
        None, description="defines your place in the list"
    )
    starting_after: Optional[str] = Field(
        None, description="defines your place in the list"
    )
    limit: Optional[str] = Field(
        None, description="The maximum number of PaymentIntents to retrieve."
    )


class AddressShippingCustomer(BaseModel):
    line1: Optional[str] = Field(None,description="Address line 1 (e.g., street, PO Box, or company name).")
    city: Optional[str] = Field(None,description="City, district, suburb, town, or village.")
    state: Optional[str] = Field(None,description="State, county, province, or region.")
    postal_code: Optional[str] = Field(None,description="ZIP or postal code.")
    country: Optional[str] = Field(None,description="Two-letter country code (ISO 3166-1 alpha-2).")

class ShippingCustomer(BaseModel):
    name: Optional[str] = Field(None,description="Recipient name.")
    phone: Optional[str] = Field(None,description="Recipient phone (including extension).")
    line1: Optional[str] = Field(None,description="Address line 1 (e.g., street, PO Box, or company name).")
    city: Optional[str] = Field(None,description="City, district, suburb, town, or village.")
    state: Optional[str] = Field(None,description="State, county, province, or region.")
    postal_code: Optional[str] = Field(None,description="ZIP or postal code.")
    country: Optional[str] = Field(None,description="Two-letter country code (ISO 3166-1 alpha-2).")

class CreateStripeCustomerInput(BaseModel):
    name: str = Field(description="Full name or business name of the customer")
    email: Optional[str] = Field(None, description="Email address of the customer")
    description: Optional[str] = Field(None, description="An arbitrary string that you can attach to a customer object")
    balance: Optional[int] = Field(None,description="An integer amount in cents representing the current balance of the customer")
    phone: Optional[str] = Field(None, description="Phone number of the customer")
    shipping: Optional[ShippingCustomer] = Field(None, description="Shipping information for the customer")
    address: Optional[AddressShippingCustomer] = Field(None, description="The address of the customer")

class UpdateStripeCustomerInput(BaseModel):
    customer_id: str = Field(description="The id of the customer to be modified")
    name: Optional[str] = Field(None,description="Full name or business name of the customer")
    description: Optional[str] = Field(None, description="An arbitrary string that you can attach to a customer object")
    email: Optional[str] = Field(None, description="Email address of the customer")
    address: Optional[AddressShippingCustomer] = Field(None, description="The address of the customer")
    shipping: Optional[ShippingCustomer] = Field(None, description="Shipping information for the customer")
    balance: Optional[int] = Field(None,description="An integer amount in cents representing the current balance of the customer")
    phone: Optional[str] = Field(None, description="Phone number of the customer")

class GetStripeCustomerInput(BaseModel):
    customer_id: str = Field(description="The id of the customer to be retrieved")

class DeleteStripeCustomerInput(BaseModel):
    customer_id: str = Field(description="The id of the customer to be deleted")

class GetManyStripeCustomersInput(BaseModel):
    limit: Optional[int] = Field(
        None, description="The maximum number of customers to retrieve."
    )
    email: Optional[str] = Field(
        None, description="Filter customers by a specific email address."
    )
class CreateStripeCouponInput(BaseModel):
    percent_off: str = Field(
        description="A positive float larger than 0, and smaller or equal to 100, that represents the discount the coupon will apply (required if amount_off is not passed)."
    )
    currency: str = Field(description="Three-letter ISO currency code, in lowercase")
    name :str = Field(description="Name of the coupon displayed to customers on, for instance invoices, or receipts.")

class GetManyStripeCouponInput(BaseModel):
    limit: Optional[str] = Field(
        None, description="The maximum number of coupons to retrieve."
    )

@mcp.tool()
async def stripeGetBalance() -> dict:
    """
    Retrieve balance from stripe.
    """
    try:
        creds =f'{{"apiKey": "{os.environ.get("STRIPE_API_KEY")}"}}'
        response = stripe_software.stripe_get_balance(creds)
        return response
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"

@mcp.tool()
async def stripeCreatePaymentintent(params: CreateStripePaymentintentInput) -> dict:
    """
    Creates a PaymentIntent in Stripe
    """
    try:
        creds =f'{{"apiKey": "{os.environ.get("STRIPE_API_KEY")}"}}'
        params = params.model_dump(exclude_none=True)
        response = stripe_software.stripe_create_paymentintent(creds, params)
        return response
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"


@mcp.tool()
async def stripeUpdatePaymentintent(params: UpdateStripePaymentintentInput) -> str:
    """
    Updates an existing PaymentIntent in Stripe.
    """
    try:
        creds =f'{{"apiKey": "{os.environ.get("STRIPE_API_KEY")}"}}'
        params = params.model_dump(exclude_none=True)
        response = stripe_software.stripe_update_paymentintent(creds, params)
        return "The PaymentIntent has been successfully updated"
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"



@mcp.tool()
async def stripeGetPaymentintent(params: GetStripePaymentintentInput) -> dict:
    """
    Retrieves a specific PaymentIntent from Stripe
    """
    try:
        creds =f'{{"apiKey": "{os.environ.get("STRIPE_API_KEY")}"}}'
        params = params.model_dump(exclude_none=True)
        response = stripe_software.stripe_get_paymentintent(creds, params)
        return response
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"


@mcp.tool()
async def stripeCancelPaymentintent(params: CancelStripePaymentintentInput) -> str:
    """
    Cancels an existing PaymentIntent in Stripe
    """
    try:
        creds =f'{{"apiKey": "{os.environ.get("STRIPE_API_KEY")}"}}'
        params = params.model_dump(exclude_none=True)
        response = stripe_software.stripe_cancel_paymentintent(creds, params)
        return "The PaymentIntent has been successfully canceled."
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"
    
@mcp.tool()
async def stripeGetManyPaymentintent(params: GetManyStripePaymentintentInput) -> dict:
    """
    Retrieves all PaymentIntents from Stripe
    """
    try:
        creds =f'{{"apiKey": "{os.environ.get("STRIPE_API_KEY")}"}}'
        params = params.model_dump(exclude_none=True)
        response = stripe_software.stripe_get_many_paymentintents(creds, params)
        return response
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"

@mcp.tool()
async def stripeCreateCustomer(params: CreateStripeCustomerInput) -> dict:
    """
    Creates a new customer in Stripe
    """
    try:
        creds =f'{{"apiKey": "{os.environ.get("STRIPE_API_KEY")}"}}'
        params = params.model_dump(exclude_none=True)
        response = stripe_software.stripe_create_customer(creds, params)
        return response
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"

@mcp.tool()
async def stripeUpdateCustomer(params: UpdateStripeCustomerInput) -> str:
    """
    Updates an existing customer in Stripe
    """
    try:
        creds =f'{{"apiKey": "{os.environ.get("STRIPE_API_KEY")}"}}'
        params = params.model_dump(exclude_none=True)
        response = stripe_software.stripe_update_customer(creds, params)
        return "The customer has been successfully updated"
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"



@mcp.tool()
async def stripeGetcustomer(params: GetStripeCustomerInput) -> dict:
    """
    Retrieves a specific customer from Stripe
    """
    try:
        creds =f'{{"apiKey": "{os.environ.get("STRIPE_API_KEY")}"}}'
        params = params.model_dump(exclude_none=True)
        response = stripe_software.stripe_get_customer(creds, params)
        return response
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"


@mcp.tool()
async def stripeDeleteCustomer(params: DeleteStripeCustomerInput) -> str:
    """
    Deletes a customer from Stripe
    """
    try:
        creds =f'{{"apiKey": "{os.environ.get("STRIPE_API_KEY")}"}}'
        params = params.model_dump(exclude_none=True)
        response = stripe_software.stripe_delete_customer(creds, params)
        return "The customer has been successfully deleted."
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"


@mcp.tool()
async def stripeGetManyCustomers(params: GetManyStripeCustomersInput) -> dict:
    """
    Retrieves all customers from Stripe
    """
    try:
        creds =f'{{"apiKey": "{os.environ.get("STRIPE_API_KEY")}"}}'
        params = params.model_dump(exclude_none=True)
        response = stripe_software.stripe_get_many_customers(creds, params)
        return response
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"


@mcp.tool()
async def stripeCreateCoupon(params: CreateStripeCouponInput) -> dict:
    """
    Creates a Coupon in Stripe
    """
    try:
        creds =f'{{"apiKey": "{os.environ.get("STRIPE_API_KEY")}"}}'
        params = params.model_dump(exclude_none=True)
        response = stripe_software.stripe_create_coupon(creds, params)
        return response
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"
    


@mcp.tool()
async def stripeGetManyCoupon(params: GetManyStripeCouponInput) -> dict:
    """
    Retrieves all coupons from Stripe
    """
    try:
        creds =f'{{"apiKey": "{os.environ.get("STRIPE_API_KEY")}"}}'
        params = params.model_dump(exclude_none=True)
        response = stripe_software.stripe_get_many_coupons(creds, params)
        return response
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"


if __name__ == "__main__":
    mcp.run()