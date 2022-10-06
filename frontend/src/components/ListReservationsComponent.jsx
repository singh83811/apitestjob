import React, { Component } from 'react'
import ReservationService from '../services/ReservationService'
import DataTable from "react-data-table-component";

class ListReservationsComponent extends Component
{
	constructor ( props )
	{
		super( props )

		this.state = {
			reservations: [],
			NonAirbnbSum: 0,
			SubTotalAerie: 0,
			SubTotal20260: 0,
			SubTotal304: 0,
			total: 0,
			TotalNetIncome: 0,
			TotalAccommFare: 0,
			TotalCleanFare: 0,
			TotalTax: 0,
			TotalADJ: 0,
			TotalDISC: 0,
			TotalCNCLFee: 0,
			TotalHostFee: 0,
			TotalBalanceDue: 0,
			GrandTotal: 0

		}
	}

	componentDidMount ()
	{
		ReservationService.getReservations().then( ( res ) =>
		{
			this.setState( { reservations: res.data.data } );
			console.log( res.data.data, "check data" )

			res.data.data.forEach( ( item ) =>
			{
				if ( item.listing.nickname.includes( 'Aerie' ) )
				{
					this.state.SubTotalAerie += item.money.netIncome
				}
				if ( item.listing.nickname.includes( '20260' ) )
				{
					this.state.SubTotal20260 += item.money.netIncome
				}

				if ( item.listing.nickname.includes( '304' ) )
				{
					this.state.SubTotal304 += item.money.netIncome
				}
				if ( item.listing.nickname.includes( 'Aerie' ) && item.source != "airbnb2" )
				{
					this.state.NonAirbnbSum += item.money.netIncome
				}

				this.state.total = this.state.SubTotalAerie + this.state.SubTotal20260 + this.state.SubTotal304;
				this.state.TotalNetIncome += item.money.netIncome
				this.state.TotalAccommFare += item.money.fareAccommodation
				this.state.TotalCleanFare += item.money.fareCleaning
				this.state.TotalTax += item.money.hostServiceFeeIncTax
				this.state.TotalADJ += item.money.fareAccommodationAdjustment
				this.state.TotalDISC += item.money.fareAccommodationDiscount
				this.state.TotalCNCLFee += item.money.fareCleaning
				this.state.TotalHostFee += item.money.hostServiceFee
				this.state.TotalBalanceDue += item.money.balanceDue
				this.state.GrandTotal += item.money.totalPaid
			} )
		} );
	}

	render ()
	{
		return (
			<div className='container-fluid'>
				<h2 className="text-center">Reservations List</h2>
				<form>
					<label className='filterLabel'>
						Filter:
						<br />
						<input type="date" name="filter" format='yyyy-MM-dd' />
					</label>
				</form>
				<br></br>
				<div className="row">
					<table className="table table-striped table-bordered">

						<thead>
							<tr>
								<th> LISTING'S NICKNAME</th>
								<th> CHECK IN</th>
								<th> CHECK OUT</th>
								<th> NIGHTS</th>
								<th> GUESTS NAME</th>
								<th> SOURCE</th>
								<th> CREATION DATE</th>
								<th> NET INCOME</th>
								<th> CONF DATE</th>
								<th> ACCOMM FARE</th>
								<th> CLEAN FARE</th>
								<th> TAX</th>
								<th> ADJ</th>
								<th> DISC</th>
								<th> CNCL FEE</th>
								<th> HOST FEE</th>
								<th> BALANCE DUE</th>
								<th> TOTAL PAID</th>
							</tr>
						</thead>
						<tbody>
							{
								this.state.reservations.map(
									reservation =>
										<tr key={ reservation.id }>
											<td> { reservation.listing.nickname }</td>
											<td> { reservation.checkIn } </td>
											<td> { reservation.checkOut }</td>
											<td> { reservation.nightsCount }</td>
											<td> { reservation.guest.fullName }</td>
											<td> { reservation.source }</td>
											<td> { reservation.createdAt }</td>
											<td>${ reservation.money.netIncome }</td>
											<td> { reservation.confirmedAt }</td>
											<td>${ reservation.money.fareAccommodation }</td>
											<td>${ reservation.money.fareCleaning }</td>
											<td>${ reservation.money.hostServiceFeeIncTax }</td>
											<td>${ reservation.money.fareAccommodationAdjustment }</td>
											<td>${ reservation.money.fareAccommodationDiscount }</td>
											<td>${ reservation.money.fareCleaning }</td>
											<td>${ reservation.money.hostServiceFee }</td>
											<td>${ reservation.money.balanceDue }</td>
											<td>${ reservation.money.totalPaid }</td>
										</tr>
								)
							}
							<tr>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td>${ parseFloat( this.state.TotalNetIncome.toFixed( 2 ) ) }</td>
								<td></td>
								<td>${ parseFloat( this.state.TotalAccommFare.toFixed( 2 ) ) }</td>
								<td>${ parseFloat( this.state.TotalCleanFare.toFixed( 2 ) ) }</td>
								<td>${ parseFloat( this.state.TotalTax.toFixed( 2 ) ) }</td>
								<td>${ parseFloat( this.state.TotalADJ.toFixed( 2 ) ) }</td>
								<td>${ parseFloat( this.state.TotalDISC.toFixed( 2 ) ) }</td>
								<td>${ parseFloat( this.state.TotalCNCLFee.toFixed( 2 ) ) }</td>
								<td>${ parseFloat( this.state.TotalHostFee.toFixed( 2 ) ) }</td>
								<td>${ parseFloat( this.state.TotalBalanceDue.toFixed( 2 ) ) }</td>
								<td>${ parseFloat( this.state.GrandTotal.toFixed( 2 ) ) }</td>
							</tr>
						</tbody>
					</table>
					<div className='row my-5'>
						<div className='col-md-6'>
							<label className='filterLabel'>Subtotal Aerie
								<br />
								<strong>{ parseFloat( this.state.SubTotalAerie.toFixed( 2 ) ) }</strong>
							</label>
						</div>
						<div className='col-md-6'>
							<label className='filterLabel'>Aerie (non Airbnb revenue)
								<br />
								<strong>{ parseFloat( this.state.NonAirbnbSum.toFixed( 2 ) ) }</strong>
							</label>
						</div>
					</div>
					<div className='row my-5'>
						<div className='col-md-6'>
							<label className='filterLabel'>Subtotal 20260
								<br />
								<strong>{ parseFloat( this.state.SubTotal20260.toFixed( 2 ) ) }</strong>
							</label>
						</div>
						<div className='col-md-6'>
							<label className='filterLabel'>Aerie Sales Tax
								<br />
								<strong>{ parseFloat( ( this.state.NonAirbnbSum * 0.07 ).toFixed( 2 ) ) }</strong>
							</label>
						</div>
					</div>
					<div className='row my-5'>
						<div className='col-md-6'>
							<label className='filterLabel'>Subtotal 304
								<br />
								<strong>{ parseFloat( this.state.SubTotal304.toFixed( 2 ) ) }</strong>
							</label>
						</div>
						<div className='col-md-6'>
							<label className='filterLabel'>Aerie Surtax
								<br />
								<strong>{ parseFloat( ( this.state.NonAirbnbSum * 0.01 ).toFixed( 2 ) ) }</strong>
							</label>
						</div>
					</div>
					<div className='row my-5'>
						<div className='col-md-12'>
							<label className='filterLabel'>Total
								<br />
								<strong>{ parseFloat( this.state.total.toFixed( 2 ) ) }</strong>
							</label>
						</div>
					</div>
				</div>

			</div>


		)
	}
}

export default ListReservationsComponent